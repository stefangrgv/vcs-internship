import React from 'react'

class ListContents extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
        this.fetchKodjaList = this.fetchKodjaList.bind(this);
    }

    componentWillMount() {
        this.fetchKodjaList();
    }

    fetchKodjaList () {
        console.log('fetching...')
        fetch('http://localhost:8000/kodjalink/')
        .then(response => response.json())
        .then(data => console.log(data));
    }

    render () {
        return (
        <div className="ListContents">
            <h5>Loading List contents...</h5>
        </div>
        )
    }
}

export default ListContents