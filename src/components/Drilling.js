import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Drilling.css';
import run from './run.js';
import API from "../api/API";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class Drilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rigCount: API.getDrillData().length,
            rigs: [...API.getDrillData(), { rigID: 'hold', tanks: [] }],
        };
    }

    addRigClick = () => {
        this.setState({
            rigs: [...this.state.rigs, { rigID: this.state.rigCount, tanks: [] }],
            rigCount: this.state.rigCount + 1
        });
    };

    onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        //SPREAD IT!!
        let rigsCopy = [...this.state.rigs];

        if (source.droppableId === destination.droppableId) {
            let index = rigsCopy.findIndex(e => e.rigID == source.droppableId);
            let arr = rigsCopy[index].tanks;
            let temp = arr.splice(source.index, 1);     //is array of 1 element
            arr.splice(destination.index, 0, temp[0]);
            rigsCopy[index].tanks = arr;
            this.setState({ rigs: rigsCopy });

        } else {                                                        //dragging to new rig
            let index1 = rigsCopy.findIndex(e => e.rigID == source.droppableId);
            let index2 = rigsCopy.findIndex(e => e.rigID == destination.droppableId);
            let arr1 = [...rigsCopy[index1].tanks];
            let arr2 = [...rigsCopy[index2].tanks];
            let temp = arr1.splice(source.index, 1);
            arr2.splice(destination.index, 0, temp[0]);
            rigsCopy[index1].tanks = arr1;
            rigsCopy[index2].tanks = arr2;
            this.setState({ rigs: rigsCopy });
        }
    };
    // this.state.rigs.filter(e => e.rigID != 'hold')

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className='rigsDiv'>
                    {this.state.rigs.filter(e => e.rigID != 'hold').map((rig, i) =>
                        <Rig rig={rig} />
                    )}
                    <Fab size="small" color="secondary" aria-label="add" className='addRigBtn'
                         onClick={this.addRigClick}>
                        <AddIcon />
                    </Fab>
                    <Button onClick={() => run(this.state.rigs)} variant="contained">Run</Button>
                </div>
                <Droppable droppableId='hold'>
                    {(provided, snapshot) => (
                        <div
                            className='holder'
                            ref={provided.innerRef}
                        >
                            {this.state.rigs.find(e => e.rigID == 'hold').tanks.map((tank, i) =>
                                <Tank tank={tank} index={i} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

function Rig(props) {
    console.log(props);
    return (
        <div className='rigDiv' >
            <div className='rigName'>
                Rig {props.rig.rigID + 1}
            </div>
            <Droppable droppableId={String(props.rig.rigID)}>
                {(provided, snapshot) => (
                    <div
                        className='tankListDiv'
                        ref={provided.innerRef}
                    >
                        {props.rig.tanks.map((tank, i) =>
                            <Tank tank={tank} index={i} />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    )
}



function Tank(props) {
    let texts = [];
    for (let i in props.tank.benches) {
        texts.push(i + ' ' + props.tank.benches[i])
    }

    return (
        <Draggable
            draggableId={String(props.tank.tankID)}
            index={props.index}
            key={props.tank.tankID}
        >
            {(provided, snapshot) => (
                <div
                    className='tankdiv'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='tooltip'>
                        <div>S2S Days 20</div>
                        <div>F2F Days 10</div>
                        {texts.map(e => <div>{e}</div>)}
                    </div>

                    {props.tank.name}
                </div>
            )}
        </Draggable>
    )
}
