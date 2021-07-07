import styles from './login.module.css';
import { useForm } from 'react-hook-form';
import { authService } from '../services';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter()
    const [stateFormMessage, setStateFormMessage] = useState({});
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    async function onSubmit(data) {
        const result = await authService.authUser(data);
        if (result.error) {
            setStateFormMessage(result);
        } else{
            Cookies.set('data', result.data.accessToken);
            if (result.data.tipe==='dosen') {
                router.push('/dosen/beranda');
            }else{
                router.push('/mahasiswa/beranda');
            }
        }
    }
    return (
            <main className={styles.form_signin}>
                <h1 className="h3 mb-3 fw-normal title"><FontAwesomeIcon icon={ faSignInAlt }/> Login</h1>
                <div className="alert alert-primary" role="alert">
                    Gunakan NIM Untuk Username dan Password. <br />
                    {errors.nim && errors.nim.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Username wajib diisi <br /> </>}
                    {errors.nim && errors.nim.type === "maxLength" && <><FontAwesomeIcon icon={ faTimesCircle }/> Username maksimal 10 kareakter <br /></> }
                    {errors.password && errors.password.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Password wajib diisi <br /></>}
                </div>

                {stateFormMessage.error && (            
                    <div className="alert alert-danger" role="alert">
                    <FontAwesomeIcon icon={ faTimesCircle }/> {stateFormMessage.message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" placeholder="Nim" {...register("nim", {required: true, maxLength: 10})} />
                        <label>Username</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" placeholder="Password" {...register("password", {required: true})} />
                        <label>Password</label>
                    </div>
                    <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                        <FontAwesomeIcon icon={ faSignInAlt }/> Masuk
                    </button>
                </form>
            </main> 
    );
}


