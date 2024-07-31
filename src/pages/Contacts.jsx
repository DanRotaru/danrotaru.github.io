import { React } from 'react';


function Contacts() {
	return (
		<section className="contacts-section">
            <h5 className="h5">CONTACTS</h5>
            <h1 className="h1">Contact me.</h1>
            <div className="contacts">
                <a href="https://bit.ly/3H9H4Ja" target="_blank" data-splitbee-event="Open Telegram" className="btn" rel="noreferrer">
                    Text me on Telegram
                    <svg>
                        <use xlinkHref="#svgsprite-telegram"></use>
                    </svg>
                </a>
                <a href="mailto:dan.rotaru2000@gmail.com" data-splitbee-event="Open Email" className="btn">
                    Text me on email
                    <svg>
                        <use xlinkHref="#svgsprite-email"></use>
                    </svg>
                </a>
                <a href="https://bit.ly/3mum7zg" target="_blank" data-splitbee-event="Open Github" className="btn" rel="noreferrer">
                    Me on Github 
                    <svg>
                        <use xlinkHref="#svgsprite-github"></use>
                    </svg>
                </a>
                <a href="https://bit.ly/3ztWA0S" target="_blank" data-splitbee-event="Open LinkedIn" className="btn" rel="noreferrer">
                    Me on LinkedIn 
                    <svg>
                        <use xlinkHref="#svgsprite-linkedin"></use>
                    </svg>
                </a>
                <a href="https://bit.ly/3xfzlEZ" target="_blank" data-splitbee-event="Open Twitter" className="btn" rel="noreferrer">
                    Me on Twitter 
                    <svg>
                        <use xlinkHref="#svgsprite-twitter"></use>
                    </svg>
                </a>
            </div>

            <form className="contact-form">
                <input type="text" placeholder="Your name" required/>
                <input type="text" placeholder="Subject" required/>
                <textarea placeholder="Message" required></textarea>
                <button className="btn">Send</button>
            </form>
        </section>
	);
}

export default Contacts;
