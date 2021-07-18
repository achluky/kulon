import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTimesCircle, faCheckCircle, faPlusCircle, faMinusCircle, faVials } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';
import { soalService } from '../../../../services';
import { useState, useEffect } from 'react';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export default function Edit({soal, profil}){
    const [stateFormMessage, setStateFormMessage] = useState({});

    function createArrayWithNumbers(length) {
        return Array.from({ length }, (_, k) => k + 1);
    }

    const test_case = soal.test_case;
    const default_test_case = {};

    var count = Object.keys(test_case).length;
    const [size, setSize] = useState(count);
    default_test_case['id_soal'] = soal.id_soal;
    test_case.forEach((test_case, index) => {
        index = index + 1;
        default_test_case['masukan.'+index+'.nilai'] = test_case.masukan;
        default_test_case['keluaran.'+index+'.nilai'] = test_case.keluaran;
    });
    
    const { register, handleSubmit, formState } = useForm({
        defaultValues: default_test_case
    });
    const { errors } = formState;
    const id_kelas_material = soal.id_kelas_material
    const id_soal =  soal.id_soal;
    async function onSubmit(data) {
        const testCase_soal = [];
        data.masukan.map(
            (tC, index) => {
                const id_test_case = uuidv4();
                testCase_soal.push({
                    "id_kelas_material": id_kelas_material,
                    "id_soal": id_soal,
                    "id_test_case": id_test_case,
                    "masukan": tC.nilai,
                    "keluaran": data.keluaran[index].nilai,
                    "createAt": moment().format("DD-MM-YYYY hh:mm:ss"),
                    "updateAt": moment().format("DD-MM-YYYY hh:mm:ss")
                });
            }
        );

        const soal = {
            "id_soal": id_soal,
            "test_case": testCase_soal,
            "createAt": moment().format("DD-MM-YYYY hh:mm:ss"),
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss")
        }
        const result = await soalService.updateTestCase(soal);
        setStateFormMessage(result);
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
                        <nav className="navbar navbar-light bg-light mb-3">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Edit : Test Case</span>
                                <div className="float-end">
                                    <Link href="/dosen/soal">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>


                        <form onSubmit={handleSubmit(onSubmit)}>

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
                        
                        <div className="card">
                            <div className="card-body">
                                    <div className="d-grid gap-1 d-md-flex mb-4">
                                        <button className="btn btn-primary me-md-2" type="button"  onClick={() => setSize(size + 1)}>
                                            <FontAwesomeIcon icon={ faPlusCircle }/> Tambah Jumlah Test Case
                                        </button>
                                        <button className="btn btn-primary" type="button"  onClick={() => setSize(size - 1)}>
                                            <FontAwesomeIcon icon={ faMinusCircle }/> Kurangi Jumlah Test Case
                                        </button>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="hidden" className="form-control" {...register("id_soal", {required: true})} />
                                    </div>      
                                    
                                    {createArrayWithNumbers(size).map(index => {
                                        const fieldName = `masukan_keluaran[${index}]`
                                        return (
                                            <>
                                                <div className="row g-3" name={fieldName} key={index} >
                                                    <div className="col">
                                                        <div className="form-floating mb-3 md-1">
                                                            <textarea style={{height: 100}} 
                                                            type="text" 
                                                            className="form-control" 
                                                            {...register(`masukan.${index}.nilai`, { required: true })}
                                                            ></textarea>
                                                            <label>Masukan {index}</label>
                                                            {errors.masukan && errors.masukan.type === "required" && 
                                                                <>
                                                                    <div className="alert alert-danger mt-2" role="alert" style={{padding: '0.2rem 0.5rem'}}>
                                                                        <FontAwesomeIcon icon={ faTimesCircle }/> Masukan Soal wajib diisi
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-floating mb-3 md-1">
                                                            <textarea style={{height: 100}} 
                                                            type="text" 
                                                            className="form-control" 
                                                            {...register(`keluaran.${index}.nilai`, { required: true })}
                                                            ></textarea>
                                                            <label>Keluaran  {index}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                            </div>
                        </div>
            
                        <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2 mt-3">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                            <FontAwesomeIcon icon={ faSave }/> Perbaharui Data
                        </button>
                        
                        </form>
                                
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
    const baseApiUrl = `${origin}/api/soal/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const soal = await result.json();

    return {
        props: {
            soal: soal,
            profil
        },
    };
}
