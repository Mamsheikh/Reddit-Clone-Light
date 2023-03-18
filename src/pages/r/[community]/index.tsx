import { Community, communityState } from '@/atoms/communitiesAtom';
import CommunityNotFound from '@/components/Community/CommunityNotFound';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import Posts from '@/components/Posts/Posts';
import { auth, firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  const [user, loadingUser, error] = useAuthState(auth);
  console.log('here is data', communityData); // missing a lot of data like shown here (only have ID) https://youtu.be/rDAdcZ2KdNg?t=3663
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, []);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts
            communityData={communityData}
            // userId={user?.uid}
            // loadingUser={loadingUser}
          />
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('GET SERVER SIDE PROPS RUNNING');

  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.community as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
            )
          : '',
      },
    };
  } catch (error) {
    // Could create error page here
    console.log('getServerSideProps error - [community]', error);
  }
}

export default CommunityPage;
