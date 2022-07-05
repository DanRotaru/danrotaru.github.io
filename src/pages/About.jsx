import { React } from 'react';

function About() {
	return (
        <section className="about-section">
            <h5 className="h5">ABOUT ME</h5>
            <h1 className="h1">Here's my story.</h1>

            <p>
                I'm DanRotaru, a hard-working web developer, creative coder and self-proclaimed designer who specializes in front-end development. I use a modern and individual approach to any task. Currently, I'm based in Chisinau, Moldova.
            </p>
            <p>
                My IT career I started in 2014 with some simple things in HTML & CSS🙂, after I started learning PHP I built some personal projects, at the beginning it was just a hobby, but with time I loved it so much, and now I'm here. Now I prefer using JavaScript as my primary development language.
            </p>
            <p>
                Currently, I'm student at <a href="https://utm.md/en/" target="_blank" rel="noreferrer">Technical University of Moldova</a>, will graduate in 2023. Since 2019 I am working as freelancer at <a href="https://bit.ly/3NDKbeT" target="_blank" data-splitbee-event="Open Kwork profile" rel="noreferrer">Kwork</a>, performed 100+ orders, a lot of new projects, clients, some cool and interesting tasks. I'm based more on front-end, but I also have full-stack projects, my main tasks as freelancer were development, design, maintenance.
            </p>

            <h2>My skills & used tehnologies</h2>
            <dl>
                <dt>HTML5</dt>
                <dt>Web UI/UX</dt>
                <dt>Responsive/adaptive design</dt>
                <br/>
                <dt>CSS</dt>
                <ol>
                    <li>SASS, SCSS</li>
                    <li>Tailwind</li>
                    <li>Bootstrap</li>
                    <li>Materialize</li>
                    <li>Skeleton</li>
                    <li>Animate.css</li>
                </ol>
                <dt>JavaScript</dt>
                <ol>
                    <li>Express.JS</li>
                    <li>EJS, Handlebars</li>
                    <li>React.JS</li>
                    <li>WebSocket, Socket.IO</li>
                    <li>Jest (node tests)</li>
                    <li>Mongoose</li>
                    <li>Electron</li>
                    <li>jQuery</li>
                    <li>Bootstrap</li>
                    <li>Npm, npx</li>
                    <li>JSON</li>
                </ol>
                <dt>PHP</dt>
                <ol>
                    <li>PHP ≥ 5.6</li>
                    <li>Medoo (lightweight library to work with database)</li>
                    <li>Vesta CP</li>
                    <li>PhpMyAdmin</li>
                </ol>
                <dt>Database</dt>
                <ol>
                    <li>SQL, MySQL</li>
                    <li>MongoDB</li>
                    <li>SQLite</li>
                </ol>
                <dt>Design</dt>
                <ol>
                    <li>Figma</li>
                    <li>Adobe Illustrator</li>
                    <li>Adobe Photoshop</li>
                </ol>
                <dt>Others, basic level</dt>
                <ol>
                    <li>Android applications (java & kotlin)</li>
                    <li>C# (especially used for creating windows applications)</li>
                    <li>ASP.NET (web applications)</li>
                    <li>Java</li>
                    <li>Python</li>
                </ol>
                <dt>Servers configuration (VDS), LINUX, SSH</dt>
                <dt>And more...</dt>
            </dl>
            <h2>My software stack</h2>
            <ol className="list-p">
                <li>
                    <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a>
                    - primary development editor</li>
                <li>
                    <a href="https://github.com/rizonesoft/Notepad3" target="_blank" rel="noreferrer">Notepad3</a>
                    - enhanced notepad application, faster way to open and edit files</li>
                <li>
                    <a href="https://github.com/ikas-mc/ContextMenuForWindows11" target="_blank" rel="noreferrer">Custom Context Menu</a>
                    - add items to new windows 11 context menu</li>
                <li>
                    <a href="https://runjs.app/" target="_blank" rel="noreferrer">RunJS</a>
                    - fastest way to run js</li>
                <li>
                    <a href="https://getmailspring.com/" target="_blank" rel="noreferrer">Mailspring</a>
                    - desktop mail client</li>
                <li>
                    <a href="https://winscp.net/" target="_blank" rel="noreferrer">WinSCP</a>
                    - FTP client</li>
                <li>
                    <a href="http://instant-eyedropper.com/" target="_blank" rel="noreferrer">InstantEyedropper</a>
                    - Fastest and easiest way to get color, color picker</li>
                <li>
                    <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">Spotify</a>
                    - best music application & great playlist selection</li>
                <li>
                    <a href="http://qttabbar.wikidot.com/" target="_blank" rel="noreferrer">QTTabBar</a>
                    - adds tabs, possibility to create explorer scripts that will boost your productivity (for e.g. shortcuts, keybindings, commands)</li>
                <li>
                    <a href="https://imageglass.org/" target="_blank" rel="noreferrer">ImageGlass</a>
                    - lightweight image viewer, supports .svg, .webp, animated .gif and more</li>
                <li>
                    <a href="https://www.jam-software.com/ultrasearch_free" target="_blank" rel="noreferrer">UltraSearch</a>
                    - global file searching by name, regexp, and more</li>
            </ol>
        </section>
	);
}

export default About;
