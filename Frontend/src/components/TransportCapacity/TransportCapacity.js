import React, {Component} from 'react';
import {Col, Row, ProgressBar} from "react-bootstrap";
import styles from './styles.module.scss';
import LogisticScreen from "../PanelScreen/PanelScreen";

const TransportCapacity = (props) => (
    <div className={styles.capacityScreenWrapper}>
        <div className={styles.progressBarWrapper}> {
            props.routePointsArray.map((point) => (point.load==0?(
                    <div className={styles.routePartEnd}>
                        <div>{point.title}</div>
                        <div style={{height: '80px'}}></div>
                        <div>{point.load}</div> 
                    </div>
                ):(
                    <div className={styles.routePart}>
                        <div>{point.title}</div>
                        <ProgressBar style={{height: '60px'}} now={point.load / props.maxLoad * 100}/>
                        <div>{point.load}</div>
                    </div>
                ))
            )
        }
        </div>
    </div>

);
export default TransportCapacity;