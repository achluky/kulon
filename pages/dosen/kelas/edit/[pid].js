import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import { connectToDatabase } from "../../../api/mongodb";

export default function Edit({kelas}){
    return(
        <div>
            <div className="row">
                <div className="col-sm-3">
                    <Side />
                </div>
                <div className="col-sm-9">
                    <div className="col-sm-12">
                        <nav className="navbar navbar-light bg-light mb-3">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Edit : Kelas Perkuliahan</span>
                                <div className="float-end">
                                    <Link href="/dosen/kelas">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>

                        <div className="card">
                            <div className="card-body">
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label>Nama Kelas</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="floatingPassword" placeholder="Password" />
                                        <label>Semester</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option selected>Pilih Program Studi</option>
                                            <option value="1">Teknik Informatika</option>
                                        </select>
                                        <label>Program Studi</label>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={ faSave }/> Perbaharui</button>
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}


async function getAllKelasIds() {
    const { db } = await connectToDatabase();
    const kelas = await db
            .collection("data__kelas")
            .find({})
            .sort({ metacritic: -1 })
            .limit(1000)
            .toArray();
    const allKelas = await JSON.parse(JSON.stringify(kelas));
    const allKelasIds = allKelas.map((kls) => {
        return { params: { pid: kls._id } };
    });
    return allKelasIds;
}

export async function getStaticPaths() {
    const paths = await getAllKelasIds();
    return {
      paths,
      fallback: false,
    };
}

async function getPostData(pid) {
    const { db } = await connectToDatabase();
    const kelas = await db
            .collection("data__kelas")
            .find({_id: pid})
            .toArray();
    const kls = await JSON.parse(JSON.stringify(kelas));
    return kls;
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.pid);
    return {
      props: {
        postData: postData[0],
      },
    };
}