import React from 'react';
import Work from './Work';

import { DATA } from '../CMS/blogs';

class Main extends React.Component {

    render() {
        const skills = DATA.skills.skill_set.map((skill, index) => {
            return (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3"><i className="material-icons i-skill">arrow_right</i>{skill}</div>
            )
        })

        const works = DATA.works.map((work, index) => {
            return <Work key={index} index={index} work={work} />
        })

        return (
            <div className="main">

                <div className="side-menu">
                    <div className="m-box green"><span className="m-text">About</span>  01</div>
                    <div className="m-box green"><span className="m-text">Work</span>  02</div>
                    <div className="m-box green"><span className="m-text">Contact</span>  03</div>
                    <br />
                    <div className="m-box btn-cv">Resume</div>
                </div>

                <div className="page-about">
                    <div style={{padding:"0 10px 0 0"}}>
                        <img src="img/ar.gif" className="img-fluid" alt="ar" />
                    </div>

                    <div>
                        <div>
                            <div className="name"><span className="green">S</span>even <span className="orange">X</span>u</div>
                            <br />
                            <p className="text-about" >I'm a part of <span className="green">software developer</span>, a part of <span className="orange">artist</span> based in Bay area.</p>
                            <p className="text-about" >Graduated from <span className="green">Carnegie Mellon University</span>, I develop and design exceptional websites and applications that provide intuitive, pixel-perfect user interfaces with efficient and modern backends.</p>
                            <br />
                        </div>
                        <div >
                            <div className="grey">I've been working with:</div>
                            <br />
                            <div className="grey row" >
                                {skills}
                                <div className="col-12"><i className="material-icons i-skill">arrow_right</i><span className="flashing" style={{ color: "rgb(0, 255, 0)" }}>_</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-works container">
                    <div className="content-container">
                        <div className="row">{works}</div>
                    </div>
                </div>

                <div className="page-ct">
                    <div className="p-contact">
                        <div className="title green">Contact</div>
                        <br />
                        <p>C (+1) 412 419 5890</p>
                        <p>E xiaowenxu1992@gmail.com</p>
                        <p>A Fremont, CA 94536</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;