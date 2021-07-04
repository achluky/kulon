import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faCode, faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import {
  absoluteUrl,
  getAppCookies,
  verifyToken
} from '../utility/utils';

export default function Home({externalPostData}) {
  return (
    <>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Kuliah Online{' '}<code><FontAwesomeIcon icon={ faCode }/>{' '}Programming</code></h1>
          <p className="fs-5 text-muted">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
          </p>
        </div>

        <main>
          <div className="row row-cols-1 row-cols-md-4 mb-4 text-center">
            {externalPostData.map((data)=>{
                return (
                  <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm" key="{data.alias}">
                        <div className="card-header py-3 text-white bg-primary border-primary">
                          <Link href={data.link}><h4 className="my-0 fw-normal"> {data.title}</h4></Link>
                        </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const { data } = getAppCookies(req);  
  const baseApiUrl = `${origin}/api/home`;
  const profil = data ? verifyToken(data) : '';
  const result = await fetch(baseApiUrl);
  const home = await result.json();
  return {
    props: {
      baseApiUrl,
      profil,
      externalPostData: home,
    },
  };
}
