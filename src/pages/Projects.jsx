import { React } from 'react';

import imageMaterialdesignicons from '../assets/img/materialdesignicons.png';
import imageCcenger from '../assets/img/ccenger.jpg';
import imageSvgtools from '../assets/img/svgtools.png';
import imageStorage from '../assets/img/storage.svg';

function Projects() {
	return (
        <main className="container">
            <section className="projects-section">
                <h5 className="h5">PROJECTS</h5>
                <h1 className="h1">Some my projects.</h1>

                <div className="projects-list">
                    <div className="project">
                        <div className="about">
                            <h2 className="name">Material Design Icons</h2>
                            <p>
                                I've created a material design icons viewer, more than 7000+ icons, fastest way to get needed icons. Just icons, nothing else. Get to HTML, CSS, data path, encoded, or just download.
                            </p>
                            <a href="https://bit.ly/3NDL07I" target="_blank" className="btn open" data-splitbee-event="Open CCenger" rel="noreferrer">Open</a>
                        </div>
                        <div className="image">
                            <img src={imageMaterialdesignicons} alt="Material Design Icons"/>
                        </div>
                    </div>
                    <div className="project">
                        <div className="about">
                            <h2 className="name">CCenger - currency converter</h2>
                            <p>
                                CCenger is a Chrome Extension, a nice currency converter with clean design that have a lot of cool features like multiple converter, text selection, can work offline, auto-updating every 24h, open in window like a native app and more...
                            </p>
                            <a href="https://bit.ly/39cbyOw" target="_blank" className="btn open" data-splitbee-event="Open CCenger" rel="noreferrer">Open</a>
                        </div>
                        <div className="image">
                            <img src={imageCcenger} alt="CCenger"/>
                        </div>
                    </div>
                    <div className="project">
                        <div className="about">
                            <h2 className="name">SVG Tools</h2>
                            <p>
                                Simple way to get svg as encoded, for CSS, HTML, tag, img...
                            </p>
                            <a href="https://bit.ly/3HeRLKQ" target="_blank" className="btn open" data-splitbee-event="Open CCenger" rel="noreferrer">Open</a>
                        </div>
                        <div className="image">
                            <img src={imageSvgtools} alt="SVG Tools"/>
                        </div>
                    </div>
                    <div className="project">
                        <div className="about">
                            <h2 className="name">Storage.js</h2>
                            <p>
                                Storage.js - the smallest, lightweight library to interactive with LocalStorage API.
                            </p>
                            <a href="https://bit.ly/39gwB28" target="_blank" className="btn open" data-splitbee-event="Open CCenger" rel="noreferrer">Open</a>
                        </div>
                        <div className="image">
                            <img src={imageStorage} alt="Storage.js" className="nofit"/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
	);
}

export default Projects;
