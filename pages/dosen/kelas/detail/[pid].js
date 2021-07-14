import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faSave, faArrowAltCircleLeft, faTimesCircle, faPlusCircle, faCheckCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import { kelasMaterialService } from '../../../../services';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Login from '../../../../components/login';
import moment from "moment";
import Swal from 'sweetalert2';


export default function Detail({kelas, profil, kelas_material}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [stateFormMessage, setStateFormMessage] = useState({});
    const [stateFormMessageAccordion, setStateFormMessageAccordion] = useState({});
    const {register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }

    async function onSubmit(data) {
        const id_kelas_material = uuidv4();
        const kelas_material = {
            "id_kelas_material": id_kelas_material,
            "minggu_ke": data.minggu_ke,
            "judul": data.judul,
            "keyword_soal": data.soal,
            "materi":data.materi,
            "deadline": data.deadline,
            "status_pengerjaan":"",
            "token": kelasMaterialService.token(5),
            "id_kelas": kelas.id_kelas,
            "nama_kelas":kelas.nama_kelas,
            "semester": kelas.semester,
            "nama_semester": kelas.nama_semester,
            "prodi": kelas.prodi,
            "nama_prodi": kelas.nama_prodi,
            "nim_nidn": profil.nim_nidn,
            "nama_dosen": profil.name,
            "_id_user": profil._id,
            "createAt": moment().format("DD-MM-YYYY hh:mm:ss"),
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss"),
            "delete": "0"
        }
        const result = await kelasMaterialService.saveKelasMaterial(kelas_material);
        setStateFormMessage(result);
        if (result.error === false) {
            handleClose();
            refreshData();
        }
    }

    function deleteKelasMaterial(id_kelas_material) {
        Swal.fire({
            type: 'question',
            title: 'Konfirmasi',
            text: "Apakah Anda Yakin akan Menghapus Data Materi?",
            timer: 3000,
            showCancelButton: true
        }).then(data => {
            if (data.value === true) {
               deleteApi(id_kelas_material)
            }
        })
    }

    async function deleteApi(id_kelas_material) {
        const data = {
            id_kelas_material : id_kelas_material
        }
        const result = await kelasMaterialService.deleteKelasMaterial(data);
        setStateFormMessageAccordion(result);
        if (result.error === false) {
            refreshData();
        }
    }

    return(
        <div>
            {!profil ? (
                <Login/>
            ) : (  
            <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Informasi : Kelas Perkuliahan</span>
                                    <div className="float-end">
                                        <Link href="/dosen/kelas">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                          
                            <div className="pb-3"></div>
                            <div className="card mb-3">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">Nama Kelas</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_kelas}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Semester</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_semester}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Program Studi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_prodi}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Kode Kelas</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.kode_kelas}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Jumlah Peserta</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: </label>
                                        </div>
                                    </div>
                                    <div className=" row">
                                        <label  className="col-sm-3 col-form-label">Peserta</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {''}
                                            <Link href={"/dosen/kelas/peserta/"+ kelas.id_kelas}>
                                                <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={ faList }/> Daftar Peserta</button>
                                            </Link>
                                        </label>
                                        </div>
                                    </div>                                
                                </div>
                            </div>

                            <Button variant="primary" onClick={handleShow} className="mb-3">
                                <FontAwesomeIcon icon={ faPlusCircle }/>{' '}
                                Tambahkan Materi dan Latihan Mingguan
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header>
                                <Modal.Title>Tambahkan Materi dan Latihan Mingguan</Modal.Title>
                                </Modal.Header>
                                
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Modal.Body>
                                        <div className="alert alert-primary" role="alert">
                                            Tambahkan Informasi Materi kelas Perkuliahan. <br />
                                            {errors.minggu_ke && errors.minggu_ke.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Minggu Ke wajib diisi <br /> </>}
                                            {errors.judul && errors.judul.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Judul wajib diisi <br /> </>}
                                            {errors.soal && errors.soal.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Soal wajib diisi <br /> </>}
                                            {errors.materi && errors.materi.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Soal wajib diisi <br /> </>}
                                            {errors.deadline && errors.deadline.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Tanggal Pengumpulan wajib diisi <br /> </>}
                                        </div>
                                        {stateFormMessage.error && (            
                                            <div className="alert alert-danger" role="alert">
                                                <FontAwesomeIcon icon={ faTimesCircle }/> {stateFormMessage.message}
                                            </div>
                                        )}
                                        {stateFormMessage.error===false && (            
                                            <div className="alert alert-primary" role="alert">
                                                <FontAwesomeIcon icon={ faCheckCircle }/> {stateFormMessage.message}
                                            </div>
                                        )}
                                        <div className="form-floating mb-3">
                                            <select className="form-select" {...register("minggu_ke", { required: true })} >
                                                <option value="">Ke-</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                            </select>
                                            <label >Minggu </label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="A.1" {...register("judul", {required: true})} />
                                            <label>Judul Materi</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="A.1" {...register("materi", {required: true})} />
                                            <label>Link Materi</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="A.1" {...register("soal", {required: true})} />
                                            <label>Keyword Soal Latihan</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="datetime-local" className="form-control" placeholder="deadline" {...register("deadline", {required: true})} />
                                            <label>Deadling Pengumpulan Latihan</label> {' '}
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                                            <FontAwesomeIcon icon={ faSave }/> Simpan Data
                                        </button>
                                    </Modal.Footer>
                                </form>

                            </Modal>
                            

                            {stateFormMessageAccordion.error && (            
                                <div className="alert alert-danger" role="alert">
                                    <FontAwesomeIcon icon={ faTimesCircle }/> {stateFormMessageAccordion.message}
                                </div>
                            )}
                            {stateFormMessageAccordion.error===false && (            
                                <div className="alert alert-primary" role="alert">
                                    <FontAwesomeIcon icon={ faCheckCircle }/> {stateFormMessageAccordion.message}
                                </div>
                            )}
                            
                            <Accordion allowZeroExpanded>
                                {kelas_material.map((item) => (
                                    <AccordionItem key={item.id_kelas_material} uuid={item.id_kelas_material}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Minggu Ke - {item.minggu_ke}
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <dl className="row">
                                                <dd className="col-sm-4">Judul Perkuliahan</dd>
                                                <dd className="col-sm-8">: {item.judul}</dd>

                                                <dd className="col-sm-4">Materi</dd>
                                                <dd className="col-sm-8">: {item.materi}</dd>

                                                <dd className="col-sm-4">Soal Latihan</dd>
                                                <dd className="col-sm-8">: {item.keyword_soal}</dd>

                                                <dd className="col-sm-4">Deadline Pengumpulan Latihan</dd>
                                                <dd className="col-sm-8">: {item.deadline}</dd>


                                                <dd className="col-sm-4">Token</dd>
                                                <dd className="col-sm-8">: {item.token}</dd>
                                            </dl>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <Link href= {""} >
                                                    <button type="button" className="btn btn-primary btn-sm">
                                                        <FontAwesomeIcon icon={ faEdit }/> Edit
                                                    </button>
                                                </Link>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteKelasMaterial(item.id_kelas_material)} >
                                                    <FontAwesomeIcon icon={ faTrash }/> Hapus
                                                </button>
                                            </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export async function getServerSideProps(context) {

    const { req, query } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);

    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/kelas/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();


    const baseApiUrl_material = `${origin}/api/kelas_material/id_kelas/${query.pid}`;
    const result_material = await fetch(baseApiUrl_material)
    const kelas_material = await result_material.json();

    return {
        props: {
            baseApiUrl,
            profil,
            kelas: kelas,
            kelas_material
        },
    };
}
