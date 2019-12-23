class StringAdapter  {
    replaceSymbol(data) {
        return data.replace(/_/g," ");
    }
}

export default new StringAdapter();
