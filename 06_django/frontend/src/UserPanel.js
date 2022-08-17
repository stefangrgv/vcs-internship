import {
  React,
  useState
} from 'react';
import {
  Link,
  useOutletContext,
  useNavigate,
} from 'react-router-dom';
import {
  apiUserGet,
  apiListDelete,
} from './apiRequests';
import { createShareModalBody } from './Modal';
import './style.css';

function UserPanel (props) {
  const context = useOutletContext();
  const navigate = useNavigate();
  let [isQuerySent, setQuerySent] = useState(false);
  let [linklists, setLinklists] = useState([]);

  const deleteList = async (id) => {
    const response = await apiListDelete(id, context.user, context.serverAddress);
    if (response.status === 204) {
      setQuerySent(false);
    } else {
      let message = response.error.message;
      if (response.response.status === 401) {
        message = 'You are not logged in.';
      } else if (response.response.status === 403) {
        message = 'Permission denied: you do not own this list.';
      } else if (response.response.status === 404) {
        message = 'List not found!';
      }
      context.showMessageModal(message);
    }
  }

  const loadUserData = async () => {
    let response = await apiUserGet(
      context.user.username, context.user.token, context.serverAddress);
    if (response.statusText === 'OK') {
      setLinklists(response.data.linklists);
    } else {
      context.showMessageModal(
        response.response.status === 401 ? 'You are not logged in!'
        : response.message);
    }
    setQuerySent(true);
  }

  const renderMyLists = () => {
    if (!isQuerySent) {
      loadUserData();
      return <h4>loading...</h4>;
    } else {
      if (linklists.length === 0) {
        return (
          <div className='mylists-list'>
            <h4>You have no linklists!</h4>
          </div>)
      } else {
        return (
          <div className='mylists-list'><ol>
            {linklists.map((el) => {
              return (
                <li className='mylists-list-item' key={el.id}>
                  <Link
                    className='hyperlink'
                    to={`/list/${el.id}/`}
                  >{el.title}</Link>
                  <button
                    className = 'btn'
                    onClick = {() => context.showMessageModal(
                      createShareModalBody(el.id, context.domainName)
                    )}>
                    Share
                  </button>
                  <button
                    className='btn'
                    onClick={
                      () => navigate(`/edit/${el.id}/`)
                    }>Edit</button>
                  <button
                    className='btn btn-delete'
                    onClick={
                      () => context.showQuestionModal(
                        'Are you sure you want to delete this linklist?',
                        'Yes',
                        async () => {
                          await deleteList(el.id);
                          context.hideModal();
                          setQuerySent(false);
                        },
                        'No'
                      )
                    }>Delete</button>
                </li>)
            })}
          </ol></div>
        )
      }
    }}

  return (
    <div className='panel'>
      <div className='user-info'>
        <h3>User Panel</h3>
      </div>
      <div className='panel mylists-panel'>
        <h3>My linklists</h3>
        {renderMyLists()}
      </div>
      <button
        className='btn btn-large'
        onClick={
        () => navigate('/list/new/')
      }>Create new linklist</button>
      <button
          className='btn btn-large'
          onClick={() => {
            navigate('/myprofile/changepassword/');
        }}>Change password</button>
    </div>
  )
}

export default UserPanel;
