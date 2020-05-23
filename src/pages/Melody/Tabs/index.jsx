import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as PlusSVG } from 'images/plus.svg';
import { ReactComponent as EditSVG } from 'images/edit.svg';
import { ReactComponent as CloseSVG } from 'images/close.svg';
import { ReactComponent as CheckSVG } from 'images/check.svg';
import styles from './styles.module.scss';

export default function Tabs({ tabs: initialTabs, canEdit, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [add, setAdd] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const tabs = useRef(initialTabs);
  const cell = useRef(null);
  const rowsCount = useRef(0);
  const columnsCount = useRef(0);

  useEffect(() => {
    ctx.current = canvasRef.current.getContext("2d");
    setSize();
    drawTabs();
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
  }, []);

  const setSize = () => {
    const container = containerRef.current.offsetWidth;
    canvasRef.current.width = container - container % 28;
    rowsCount.current = Math.ceil(tabs.current.length * 28 / canvasRef.current.width);
    columnsCount.current = Math.floor(canvasRef.current.width / 28);
    canvasRef.current.height = (96 + 32) * rowsCount.current - 32;
  }

  const drawTabs = () => {
    const canvas = ctx.current;

    canvas.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // strings
    for (let i = 0; i < rowsCount.current; i++) {
      for (let j = 0; j < 6; j++) {
        let y = i * 96 + i * 32 + j * 16 + 8;

        canvas.fillRect(0, y, canvasRef.current.width, 1);
      }
    }

    canvas.font = '14px Roboto';
    tabs.current.forEach((tact, index) => {
      for (const string in tact) {
        const row = Math.floor(index / columnsCount.current);
        const x = (index % columnsCount.current) * 28
        const y = row * 96 + row * 32 + (6 - string) * 16;

        // background
        canvas.fillStyle = "white";
        canvas.fillRect(x, y, 28, 16);

        // number
        canvas.textBaseline = "middle";
        canvas.fillStyle = "#212121";
        const w = canvas.measureText(tact[string]).width;
        canvas.fillText(tact[string], x + ((28 - w) / 2), y + 8);
      }
    });

    if (cell.current) {
      canvas.strokeStyle = cell.current.selected ? '#FFA726' : '#9E9E9E';
      canvas.strokeRect(cell.current.x, cell.current.y, 28, 16);
    }
  }

  const onMouseMove = event => {
    console.log(isEditing);
    if (!isEditing) {
      return;
    }

    if (cell.current && cell.current.selected) { 
      return;
    }
    
    const { offsetX: oX, offsetY: oY } = event.nativeEvent;
    const x = Math.floor(oX / 28) * 28;
    const y = Math.floor(oY / 16) * 16;

    if (y % (96 + 32) >= 96) {
      cell.current = null;
      drawTabs();
      return;
    }

    if (!cell.current || x !== cell.current.x || y !== cell.current.y) {
      cell.current = { x, y };
      drawTabs();
    }
  }

  const select = () => {
    if (!isEditing) {
      return;
    }

    cell.current = { ...cell.current, selected: true };
    drawTabs(); 
  }

  const onMouseLeave = () => {
    if (cell.current && !cell.current.selected) {
      cell.current = null;
      drawTabs();
    }
  }

  const onKeyUp = event => {
    if (!cell.current || !cell.current.selected) {
      return;
    }

    if (event.keyCode === 27 || event.keyCode === 13) {
      cell.current = null;
      drawTabs();
      return;
    }

    const number = parseInt(event.key, 10);
    const back = event.keyCode === 8;

    if (isNaN(number) && !back) {
      return;
    }

    const tabsUpdated = [ ...tabs.current ];
    const row = Math.floor(cell.current.y / (96 + 32));
    const index = cell.current.x / 28 + row * columnsCount.current;
    const key = 6 - ((cell.current.y - row * (96 + 32)) / 16);

    if (!tabsUpdated[index]) {
      tabsUpdated[index] = {};
    }
    
    let str = tabsUpdated[index][key];

    if (str) {
      if (back) {
        str = str.slice(0, -1);
      } else {
        if (str.length === 2) {
          return;
        } else {
          str += number.toString();
        }
      }
    } else {
      str = number.toString();
    }

    tabsUpdated[index] = {
      ...tabsUpdated[index],
      [key]: str,
    };

    if (!str.length) {
      delete tabsUpdated[index][key];
    }
    
    tabs.current = tabsUpdated;
    if (tabs.current.length === rowsCount.current * columnsCount.current) {
      setAdd(true);
    } else {
      setAdd(false);
    }

    drawTabs();
  }

  const addRow = () => {
    tabs.current = [ ...tabs.current, {} ];
    setSize();
    setAdd(false);
    drawTabs();
  }

  const closeEditing = () => {
    tabs.current = initialTabs;
    drawTabs();
    setIsEditing(false);
  }

  const saveEditing = () => {
    onSave(tabs.current);
    setIsEditing(false);
  }

  return (
    <>
      {
        canEdit && (
          <div className={styles.controls}>
            {
              isEditing
                ? (
                  <>
                    <CheckSVG
                      className={styles.saveSvg}
                      onClick={saveEditing}
                    />
                    <CloseSVG
                      className={styles.closeSvg}
                      onClick={closeEditing}
                    />
                  </>
                ) : (
                  <EditSVG onClick={() => setIsEditing(true)} />
                )
            }
          </div>
        )
      }
      <div className={styles.container} ref={containerRef}>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          onMouseMove={onMouseMove}
          onClick={select}
          onMouseLeave={onMouseLeave}
        >
        </canvas>
      </div>
      {
        add && (
          <PlusSVG
            className={styles.plus}
            onClick={addRow}
          />
        )
      } 
    </>
  );
}
