import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getCommunitySlugFromUrl } from '@/utils/communities';
import { PaleParagraph, Paragraph, ParagraphTitle } from '../text';
import PostVotes from '../post-votes';
import * as testData from '../../../test-data.json';

const postThumbnail = (postThumbnailUrl?: string) => (postThumbnailUrl ? (
  <Image
    src={postThumbnailUrl}
    alt="Post thumbnail"
    sizes="80px"
    fill
    objectFit="cover"
    unoptimized
  />
) : (
  <Image
    src="/logo.png"
    alt="Post default thumbnail"
    width={80}
    height={80}
    objectFit="cover"
  />
));

const PostFeed = (): React.ReactNode => (
  <div className="bg-primary dark:bg-primary-dark">
    {testData.posts.map(postData => {
      const {
        id, body, name: title, thumbnail_url: thumbnail
      } = postData.post;
      const { actor_id: communityUrl } = postData.community;
      const communitySlug = getCommunitySlugFromUrl(communityUrl);
      const postUrl = `/post/${communitySlug}/${id}`;

      return (
        <div className="flex">
          <PostVotes />
          <Link key={id} href={postUrl} className="w-full">
            <div className="flex h-100 relative hover:bg-hover dark:hover:bg-hover-dark">
              <div className="h-full flex gap-12 px-12 py-6 items-start">
                <div className="h-80 w-80 mt-8 flex flex-shrink-0 relative">
                  {postThumbnail(thumbnail)}
                </div>
                <div className="h-full w-full flex">
                  <div className="h-full flex flex-col">
                    <ParagraphTitle className="font-semibold line-clamp-2">{title}</ParagraphTitle>
                    <div className="mb-8 flex max-md:flex-col">
                      <PaleParagraph>
                        {`Posted to ${communitySlug}`}
                      </PaleParagraph>
                    </div>
                    {body && <Paragraph className="max-md:hidden text-sm line-clamp-2">{body}</Paragraph>}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden border-b border-secondary dark:border-secondary-dark" />
          </Link>
        </div>
      );
    })}
  </div>
);

export default PostFeed;
