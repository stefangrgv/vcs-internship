import React from 'react';
import { confirm } from 'react-confirm-box';
import './App.css';

class UserPanel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
    }

    fetchUser () {
        fetch(`http://localhost:8000/api/user/${localStorage.getItem('kodjalinkUsername')}/`, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error in getting user data!');
        })
        .then((data) => {
            this.setState({
                email: data.email,
                linklists: data.linklists,
                isLoaded: true,
            })
        })
    }

    async askDeleteList (id) {
        const isDeleteConfirmed = await confirm('Are you sure you want to delete this list?');
        if (isDeleteConfirmed) {
            this.deleteList(id);
        }
    }

    deleteList (id) {
        fetch(`http://localhost:8000/api/lists/${id}`, {
            method: 'delete',
            headers: new Headers({
              'Authorization': 'Token ' + localStorage.getItem('kodjalinkUserToken'),
            })
        })
        .then(response => {
        if (response.ok) {
            this.setState({
                isLoaded: false,
            });
            alert('List deleted successfully.');
            return response.json();
        }
        // if response is not ok
        this.setState({
            isResponseOk: false,
        });
        if (response.status === 401) {
            throw new Error('You are not logged in.')
        }
        if (response.status === 403) {
            throw new Error('Permission denied: you do not own this list.')
        }
        if (response.status === 404) {
            throw new Error('List not found!')
        }
        })
        .catch((error) => {
        console.log(error);
        });
    }

    createNewList () {
        window.location.href = '/new/';
    }

    render () {
        let mylists;
        let email;

        if (!this.state.isLoaded) {
            email = <p><i>loading...</i></p>;
            mylists = <p><i>loading...</i></p>;
            this.fetchUser();
        } else {
            email = <a>{this.state.email}</a>
            if (this.state.linklists.length == 0) {
                mylists = (
                    <div className='mylists'>
                        <p>You have no linklists!</p>
                    </div>    
                )
            } else {
                mylists = (
                    <div className='mylists'>
                        <ol className='mylists_ol'>
                            {this.state.linklists.map((el) => {
                                return (
                                <li key={el.id}>
                                    <a href={`/${el.id}/`}>{el.title}</a>
                                    <button onClick={() => this.askDeleteList(el.id)}>Delete</button>
                                </li>
                                )
                            })}
                        </ol>
                    </div>
                )
            }
        }

        return (
            <div className='UserPanel'>
            <h2>User Panel</h2>
            <h3>Username: <b>{localStorage.getItem('kodjalinkUsername')}</b></h3>
            <h3><a href='/myprofile/changepassword/'>Change password</a></h3>
            <span>
                <h3>Email: </h3>{email}
            </span>
            <span>
                <h3>My linklists:</h3>
                {mylists}
            </span>
            <button onClick={this.createNewList}>Create new linklist</button>
            </div>
        )
  }
}

export default UserPanel;
