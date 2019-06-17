import React, {Component} from "react";
import classes from './styles.module.scss';
import axios from 'axios';
import {Link} from 'react-router-dom'
import CarsView from "../CarsView/CarsView";
import RightsPanel from "../RightsPanel";


const AdministratorPanel = () => (
    <>
        <CarsView/>
        
        <RightsPanel/>
    </>
);

export default AdministratorPanel;