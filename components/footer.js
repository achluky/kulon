import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faCode, faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function footer({ children }) {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
        <div className="col-12 col-md">
            <small className="d-block mb-3 text-muted"> &copy;  Institut Teknologi Sumatera 2021 </small>
        </div>
        <div className="col-6 col-md">
            <h5>Link</h5>
            <ul className="list-unstyled text-small">
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Institut Teknologi Sumatera</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Sains Data</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Teknik Informatika</a></li>
            </ul>
        </div>
        <div className="col-6 col-md">
            <h5>Referensi</h5>
            <ul className="list-unstyled text-small">
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Bebras</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Detik Com</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Dzone</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Github</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">NextJs</a></li>
            </ul>
        </div>
        <div className="col-6 col-md">
            <h5>Tentang</h5>
            <ul className="list-unstyled text-small">
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Tim Pengembang</a></li>
            <li className="mb-1"><a className="link-secondary text-decoration-none" href="#">Repository</a></li>
            </ul>
        </div>
        </div>
    </footer>
  );
}