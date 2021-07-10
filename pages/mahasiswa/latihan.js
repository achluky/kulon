import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faThumbtack} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import Image from 'next/image'
import {
    getAppCookies,
    verifyToken
} from '../../utility/utils';
import Login from '../../components/login';
import profilePic from '../../public/me.jpeg';

export default function Latihan({profil}){
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
                                    <span className="navbar-brand mb-0 h1">Latihan</span>
                                    <ul class="nav nav-pills">
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="#">1</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">2</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">3</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="row">
                                <div className="col">
                                    
                                    <div className="card">
                                        <div className="card-body p-4">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui urna, elementum ac accumsan id, molestie id diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque vestibulum erat neque, in venenatis leo imperdiet ut. Morbi tincidunt arcu a facilisis malesuada. Aliquam erat volutpat. Praesent iaculis mattis tortor sit amet commodo. Donec nec pharetra quam, id dictum ex. Morbi sed elementum metus, quis bibendum velit. Phasellus non ante at risus dignissim venenatis. Quisque scelerisque porttitor tempor. Nam eu feugiat felis. Morbi ornare turpis hendrerit tortor varius, id semper nisi tincidunt. Vivamus aliquet viverra lorem, non commodo odio sodales eget.
                                        </div>
                                    </div>

                                </div>
                                <div className="col">

                                    <div className="card">
                                        
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
