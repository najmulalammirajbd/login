import React from 'react';
import Alert from '@material-ui/lab/Alert';
import '../Registration/Registration.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faArrowRight, faBookReader, faChild, faCoffee, faEdit, faGraduationCap, faHome, faPlus, faPlusSquare, faQuran, faSchool, faSignInAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBuromobelexperte, faGoogle } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '169px'
    },
}));

export default function AutoGrid() {
    let history = useHistory();
    const RagiNow = () => {
        history.push('/registration');
    }
    const Uptodate = () => {
        history.push('/update');
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
                    history.push("/pay");
                }
            })


    }

    return (
        <div className="container">
            <div className={classes.root}>
                <Grid container spacing={3}>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={12}>

                        <div style={{ marginTop: '169px' }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3 style={{ fontSize: '12px', textAlign: 'center', color: '#30a0c7' }} className="d-flex justify-content-center TopschoolTitel">চার্জ ২৩.৪ টাকা মাত্র <br /> নিচের ফিল্ড পূরণ করে পেমেন্ট করে <br /> অ্যাপে পূণরায় লগইন করুন <br /> পেমেন্ট না করলে পরবর্তীতে <br /> আবার নতুন একাউন্ট করে <br /> পেমেন্ট করে শুনতে হবে <br /> যেভাবে পেমেন্ট করতে পারবেন <br /> বিকাশ ও নগদ , ডেবিট ও ক্রেডিট কার্ড </h3>
                                <input placeholder=" আপনার নাম" className="contactinput2" name="নাম" ref={register({ required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.নাম && <span style={{ color: '#30a0c7' }}>লিখতেই হবে</span>} <br />
                                <input placeholder=" আপনার মোবাইল" className="contactinput2" name="মোবাইল" ref={register({ required: true })} />
                                {/* errors will return when field validation fails  */}
                                <input placeholder=" আপন ইমেইল" className="contactinput2" name="ইমেইল" ref={register({ required: true })} />
                                {/* errors will return when field validation fails  */}
                                {errors.ইমেইল && <span style={{ color: '#30a0c7' }}>লিখতেই হবে</span>} <br />
                                <button className="Contactbtn">টাকা পরিশোধ করুন</button>
                            </form>
                        </div>

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}