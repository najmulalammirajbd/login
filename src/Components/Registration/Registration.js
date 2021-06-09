import React from 'react';
import '../Registration/Registration.css'
import * as firebase from "firebase/firebase";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faArrowRight, faBookReader, faBorderStyle, faChild, faCoffee, faEdit, faGraduationCap, faHome, faQuran, faSchool, faSignInAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBuromobelexperte, faGoogle } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  let history = useHistory();
  const RemoveNow = () => {
    history.push('/remove');
  }
  const Updatebtn = () => {
    history.push('/update');
  }
  const renewal = () => {
    history.push('/renewal');
  }
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    fetch('https://server-as11.herokuapp.com/massages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })

      .then(res => res.json())
      .then(success => {
        if (success) {

          history.push("/thankyou");

        }
      })


  }

  return (
    <div >
      <div style={{ textAlign: 'center', textDecoration: 'none', color: '#30a0c7', marginTop: '256px' }}>
        <a style={{ textAlign: 'center', textDecoration: 'none', color: '#30a0c7' }} href="https://najmulalammirajbd.github.io/pocast/">START</a>
      </div>
    </div>
  );
}