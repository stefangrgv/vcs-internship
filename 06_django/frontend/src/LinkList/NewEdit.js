import React, { useState, useEffect } from 'react';
import { useMatch, useOutletContext } from 'react-router-dom';

import { apiGetAllLinks } from '../apiRequests';
import { fetchList, formatURLInput } from './commonFunctions';

import TitlePanel from './ListPanels/TitlePanel';
import ContentsPanel from './ListPanels/ContentsPanel';
import AddLinkPanel from './ListPanels/AddLinkPanel';
import SaveDeletePanel from './ListPanels/SaveDeletePanel';

const NewEdit = (props) => {
  const context = useOutletContext();
  const match = useMatch(`/${props.mode === 'edit' ? 'edit' : 'list'}/:id`);

  const [isResponseOk, setResponseOk] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFetchingLinks, setFetchingLinks] = useState(false);
  const [allLinks, setAllLinks] = useState([]);
  const [isPrivate, setPrivate] = useState(false);
  const [owner, setOwner] = useState('');
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchAllLinks = () => {
    apiGetAllLinks(context.user).then((response) => {
      setAllLinks(response.data);
      setFetchingLinks(false);
    });
  };

  const updateLinkInfo = (url) => {
    return allLinks.find((l) => {
      return l.url === formatURLInput(url);
    });
  };

  const formatThumbnails = () => {
    /* 
    Formats the URL paths of all the thumbnails in the list.
    In some cases they are not accepted by the backend unless reformatted.
    */
    setLinks(
      links.map((link) => {
        let l = link;
        l['thumbnail'] = formatURLInput(link['thumbnail']);
        return l;
      })
    );
  };

  const trimLinkTitle = () => {
    /*
    Trims the title of the links to ensure it fits the
    limit enforced in the database (100 symbols).
    */
    setLinks(
      links.map((link) => {
        if (link['title'].length < 100) {
          return link;
        }

        let l = link;
        l['title'] = l['title'].slice(0, 97) + '...';
        return l;
      })
    );
  };

  useEffect(() => {
    fetchAllLinks();
    if (props.mode === 'edit') {
      fetchList(
        match.params.id,
        context,
        setTitle,
        setLinks,
        setOwner,
        setPrivate,
        setResponseOk,
        setErrorMessage
      );
    }
  }, []);

  useEffect(() => {
    if (links.find((l) => l.needsRendering && !isFetchingLinks)) {
      setLinks(
        links.map((link) => {
          if (!link.needsRendering) {
            return link;
          } else {
            let linkDbEntry = updateLinkInfo(link.url);
            if (!linkDbEntry) {
              setFetchingLinks(true);
              fetchAllLinks();
              return link;
            }
            return linkDbEntry;
          }
        })
      );
    }
  });

  if (isResponseOk || props.mode === 'new') {
    return (
      <>
        <TitlePanel
          mode={props.mode}
          title={title}
          setTitle={setTitle}
          isPrivate={isPrivate}
          setPrivate={setPrivate}
        />
        <ContentsPanel
          mode={props.mode}
          owner={owner}
          links={links}
          allLinks={allLinks}
          setLinks={setLinks}
        />
        <AddLinkPanel allLinks={allLinks} links={links} setLinks={setLinks} />
        <SaveDeletePanel
          id={match.params.id}
          mode={props.mode}
          title={title}
          links={links}
          isPrivate={isPrivate}
          formatThumbnails={formatThumbnails}
          trimLinkTitle={trimLinkTitle}
        />
      </>
    );
  }
  return <div className="error-message">{errorMessage}</div>;
};

export default NewEdit;
