import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
  } from '../../utility/utils';

export default function Post({postData}) {
    return (
        <div>
            <main>
                <h3>{ postData.title }</h3>
                <p>{ postData.deskripsi }</p>
            </main>
        </div>
    );
}

async function getAllPostIds() {
    const apiUrl = "http://localhost:3000/api/home";
    const response = await fetch(apiUrl);
    const allPosts = await response.json();
    const allPostIds = allPosts.map((post) => {
        return { params: { id: post.alias } };
    });
    return allPostIds;
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
      paths,
      fallback: false,
    };
}

async function getPostData(id) {
    const apiURL = "http://localhost:3000/api/home?alias=${id}";
    const response = await fetch(apiURL);
    const postData = await response.json();
    return postData;
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData: postData[0],
      },
    };
}
