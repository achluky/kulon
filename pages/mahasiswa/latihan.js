import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRunning, faSave} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import {
    getAppCookies,
    verifyToken
} from '../../utility/utils';
import Login from '../../components/login';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Countdown from 'react-countdown';


export default function Latihan({profil}){
    if (typeof window !== "undefined") {
        loader.init().then((monaco) => {
            const wrapper = document.getElementById("editor");
            // wrapper.style.height = "90vh";
            const properties = {
                value: "\n# Selamat Datang \n# Silahkan Gunakan Editor ini untuk \n# menuliskan jawaban  \n\n# This program adds two numbers \nnum1 = 1.5 \nnum2 = 6.3 \n# Add two numbers \nsum = num1 + num2 \n# Display the sum \nprint('The sum of {0} and {1} is {2}'.format(num1, num2, sum)) ",
                language: "python",
                theme:"vs-light"
            };
        
            monaco.editor.create(wrapper, properties);
        });
    }

    function handleEditorChange(value, event) {
        console.log("here is the current model value:", value);
    }

    const Completionist = () => <span> You are good to go!</span>;
    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
        return <Completionist />;
        } else {
        return <span> {hours} Jam :{minutes} Menit :{seconds} Detik</span>;
        }
    };
  
    return(
        <div>
            {!profil ? (
                <Login />
            ) : (
                <>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Latihan Minggu Ke -1</span>
                                    <ul className="nav nav-pills">
                                        <li className="nav-item border border-primary rounded-3" style={{margin:5}}>
                                            <a className="nav-link active" href="#">1</a>
                                        </li>
                                        <li className="nav-item border border-primary rounded-3" style={{margin:5}}>
                                            <a className="nav-link" href="#">2</a>
                                        </li>
                                        <li className="nav-item border border-primary rounded-3" style={{margin:5}}>
                                            <a className="nav-link " href="#">3</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="row">
                                <div className="col-sm-5">
                                    
                                    <div className="card">
                                        <div className="card-body p-4">
                                        <p className="highlight">Task</p>
                                        <p>The provided code stub reads two integers from STDIN,  and . Add code to print three lines where:</p>
                                        <p>Example</p>
                                        <p className="highlight">
                                            a=3<br />
                                            b=5
                                        </p>
                                        <p>Print the Followint:</p>
                                        <p className="highlight">    
                                            8<br />
                                            -2 <br />
                                            15 <br />
                                        </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-7">
                                    <p className="card-text highlight">
                                        Bahasa Pemrograman : Python <br/>
                                        Running Time : 30ms <br />
                                        Sisa Waktu Pengerjaan :  
                                        <Countdown date={Date.now() + 60000} renderer={renderer}>
                                        </Countdown>
                                    </p>
                                    <div id="editor" className="border rounded-3" onChange={handleEditorChange} style={{height:400}} ></div>
                                    <div className="btn-group mt-4">
                                        <a href="#" className="btn btn-primary active">Run & Compile</a>
                                        <a href="#" className="btn btn-primary"><FontAwesomeIcon icon={ faSave }/> Simpan Code</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { data } = getAppCookies(req);
    const profil = data ? verifyToken(data) : '';
    console.log(profil);
    return {
        props: {
            profil
        }
    };
}
