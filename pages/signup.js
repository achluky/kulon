// import { providers, signIn, getSession, csrfToken , useSession} from "next-auth/client";
import styles from '../components/login.module.css';
import { useForm } from 'react-hook-form';
import { authService } from '../services';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function SignIn({ providers, csrfToken }) {
    const [session, loading] = useSession();

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    async function onSubmit(data) {
        try {
            await authService.get(data);
            useRouter.push('/dosen/beranda');
        } catch (e) { }
    }
    if (session) { 
        return  (
            <div>
                <main className={styles.form_signin}>
                    <h1 className="h3 mb-3 fw-normal title"><FontAwesomeIcon icon={ faUserPlus }/> Registrasi</h1>
                    <div className="alert alert-primary" role="alert">
                        <p>Lengkapi Data Anda</p>
                        {errors.nama && errors.nama.type === "required" && <p className="mb-1">Nama wajib diisi</p>}
                        {errors.email && errors.email.type === "required" && <p className="mb-1">Email wajib diisi</p>}
                        {errors.password && errors.password.type === "required" && <p className="mb-1">Password wajib diisi</p>}
                        {errors.nim_nidn && errors.nim_nidn.type === "required" && <p className="mb-1">NIM/NIDN wajib diisi</p>}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" placeholder="Nama" {...register("nama", {required: true})} value={session.user.name} />
                            <label>Nama</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="email" className="form-control" placeholder="Password" {...register("email", {required: true})} value={session.user.email} />
                            <label>Email</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="password" className="form-control" placeholder="Password" {...register("password", {required: true})} />
                            <label>Password</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="nim_nidn" className="form-control" placeholder="Password" {...register("nim_nidn", {required: true})} />
                            <label>NIM/NIDN</label>
                        </div>
                        <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2 mb-3">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                            <FontAwesomeIcon icon={ faSave }/>  Simpan
                        </button>
                    </form>
                </main>
            </div>
        );
    }

    return (
        <div>
            <main className={styles.form_signin}>
                {Object.values(providers).map((provider) => {
                    if (provider.name === "Email") {
                        return;
                    }
                    return (
                        <button type="submit" className="w-100 btn btn-primary mr-2 mb-3" key="{provider.id}"  onClick={() => signIn(provider.id)}>
                        Akun {provider.name}
                        </button>
                    );
                })}
            </main> 
        </div>
    );
}

SignIn.getInitialProps = async (context) => {
    const { req, res } = context;
    const session = await getSession({ req });

    if (session && res && session.accessToken) {
        res.writeHead(302, {
            Location: "/",
        });
        res.end();
        return;
    }

    return {
        session: session,
        providers: await providers(context),
        csrfToken: await csrfToken(context),
    };
};