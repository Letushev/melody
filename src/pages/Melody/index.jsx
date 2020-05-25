import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGQL } from 'api';
import { formatDate } from 'helpers';
import { ReactComponent as SettingsSVG } from 'images/settings.svg';
import { ReactComponent as ProfileSVG } from 'images/profile.svg';
import cn from 'classnames';
import Settings from './Settings';
import Tabs from './Tabs';
import * as gql from './gql';
import styles from './styles.module.scss';

export default function Melody() {
  const { id } = useParams();
  const [melody, setMelody] = useState(null);
  const [userId, setUserId] = useState(null);
  const [settings, setSettings] = useState(false);
  const levels = {
    low: 'легка',
    medium: 'середня', 
    hard: 'складна',
  };

  useEffect(() => {
    Promise.all([
      fetchGQL({
        operation: gql.getUserId,
      }),
      fetchGQL({
        operation: gql.getMelody,
        id,
      })
    ])
      .then(([userData, melodyData]) => {
        const { getMelody } = melodyData.data;

        if (userData.data.user) {
          setUserId(userData.data.user.id);
        }
        
        setMelody({
          ...getMelody,
          createdAt: formatDate(getMelody.createdAt),
          tabs: JSON.parse(getMelody.tabs) || [{}],
        });
      });
  }, []);

  if (!melody) {
    return null;
  }

  let content;

  if (settings) {
    content = (
      <Settings
        melody={melody}
        saveSettings={melodyToSave => {
          fetchGQL({
            operation: gql.updateMelody,
            id,
            name: melodyToSave.name,
            by: melodyToSave.by,
            public: melodyToSave.public,
            level: melodyToSave.level,
          })
            .then(() => {
              setMelody(melodyToSave);
            });
        }}
        cancelSettings={() => setSettings(false)}
      />
    );
  } else {
    content = (
      <Tabs
        tabs={melody.tabs}
        canEdit={userId === melody.createdBy.id}
        onSave={tabs => {
          fetchGQL({
            operation: gql.updateTabs,
            tabs: JSON.stringify(tabs),
            id,
          });
        }}
      />
    );
  }

  return (
    <>
      <div className={cn(
        styles.header,
        melody.level && styles[melody.level],
      )}>
        <h1 className={styles.name}>
          {melody.name}
        </h1>
        <p className={styles.by}>
          {melody.by}
        </p>
        {
          userId === melody.createdBy.id && (
            <SettingsSVG
              className={styles.settings}
              onClick={() => setSettings(true)}
            />
          )
        }
        <div className={styles.createdBy}>
          {
            melody.createdBy.image
              ? <img src={melody.createdBy.image} className={styles.createdByImage} />
              : <ProfileSVG className={styles.createdByImage} />
          }
          <span className={styles.createdByNickname}>
            {melody.createdBy.nickname}
          </span>
        </div>
        <span className={styles.createdAt}>
          {melody.createdAt}
        </span>
      </div>
      {
        melody.level && (
          <div>
            Складність: <b>{levels[melody.level]}</b>
          </div>
        )
      }
      {content}
    </>
  );
}
