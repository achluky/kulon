import Side from '../../components/dosen_sidebar';
import Login from '../../components/login';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
  } from '../../utility/utils';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 1398, amt: 2210}, {name: 'Page C', uv: 200, pv: 9800, amt: 2290}, {name: 'Page D', uv: 130, pv: 4800, amt: 2000}, {name: 'Page E', uv: 156, pv: 9500, amt: 2181}, {name: 'Page F', uv: 602, pv: 3908, amt: 2181}, {name: 'Page G', uv: 602, pv: 3908, amt: 2181}];
  
export default function Beranda({profil}){
    return(
        <>
            {!profil ? (
                <Login />
            ) : (
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <Side />
                        </div>
                        <div className="col-sm-9">
                            <nav className="navbar navbar-light bg-light mb-3">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Beranda</span>
                                </div>
                            </nav>

                            <div className="card">
                                <div className="card-body">
                                    <LineChart width={700} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                    </LineChart>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export async function getServerSideProps(context) {
    const { req } = context;
    const { data } = getAppCookies(req);
    const profil = data ? verifyToken(data) : '';
    return {
        props: {
            profil,
        },
    };
}
