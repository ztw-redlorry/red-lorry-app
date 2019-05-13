import React, {Component} from 'react';
import {Col, Row, ProgressBar} from "react-bootstrap";
import styles from './styles.module.scss';
import LogisticScreen from "../PanelScreen/PanelScreen";

const TransportCapacity = (props) => (
    <div className={styles.capacityScreenWrapper}>
        <div className={styles.progressBarWrapper}> {
            props.routePointsArray.map((point) => (
                    <div className={styles.routePart}>
                        <div>{point.title}</div>
                        <ProgressBar style={{height: '20px'}} now={point.load / props.maxLoad * 100}/>
                    </div>
                )
            )
        }
        </div>
    </div>

);
export default TransportCapacity;