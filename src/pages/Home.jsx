import { React } from 'react';
import { Link } from 'react-router-dom';


function Home() {
	const toAbout = () => {
		document.body.classList.remove('overflow-hidden');
	}
	return (
		<section className="home-section">
            <div className="circles-bg">
                <div className="circles-bg__wrapper">
                    <div className="circles-bg__wrapper-circle1">
                        <div className="obj"></div>
                    </div>
                    <div className="circles-bg__wrapper-circle2">
                        <div className="obj"></div>
                    </div>
                </div>
            </div>
            

            <div className="heading">
                <h1>
                    Hi👋, I'm <span>DanRotaru</span>, a fullstack web developer, designer, UI/UX.
                </h1>
            </div>
            <div className="sub-heading">
                <Link to="/about" className="btn" onClick={toAbout}>More about me</Link>
                <h2>Development. Design. Maintenance.</h2>

                <div className="socials">
                    <a href="https://bit.ly/3H9H4Ja" target="_blank" data-splitbee-event="Open Telegram" rel="noreferrer">
                        <svg>
                            <use xlinkHref="#svgsprite-telegram"></use>
                        </svg>
                    </a>
                    <a href="https://bit.ly/3mum7zg" target="_blank" data-splitbee-event="Open Github" rel="noreferrer">
                        <svg>
                            <use xlinkHref="#svgsprite-github"></use>
                        </svg>
                    </a>
                    <a href="mailto:dan.rotaru2000@gmail.com" target="_blank" data-splitbee-event="Open Email" rel="noreferrer">
                        <svg>
                            <use xlinkHref="#svgsprite-email"></use>
                        </svg>
                    </a>
                    <a href="https://bit.ly/3ztWA0S" target="_blank" data-splitbee-event="Open LinkedIn" rel="noreferrer">
                        <svg>
                            <use xlinkHref="#svgsprite-linkedin"></use>
                        </svg>
                    </a>
                    
                    <a href="https://bit.ly/3xfzlEZ" target="_blank" data-splitbee-event="Open Twitter" rel="noreferrer">
                        <svg>
                            <use xlinkHref="#svgsprite-twitter"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
	);
}

export default Home;
