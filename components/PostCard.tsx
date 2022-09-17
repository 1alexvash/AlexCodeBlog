import Image from "next/image";
import Link from "next/link";
import { Post } from "pages";
import { MouseEventHandler } from "react";
import { useAppDispatch } from "redux/typesHooks";

import { updateTags } from "../redux/slices/selectedTags";
interface Props {
	post: Post;
}
interface TagLinkProps {
	readonly tag: string;
}
const TagLink: React.FC<TagLinkProps> = ({ tag }) => {
	const dispatch = useAppDispatch();
	const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
		event.preventDefault();
		dispatch(updateTags([tag]));
	}
	return (
		<a href="" onClick={onClick}>
			#{tag}
		</a>
	)
}
const PostCard = ({ post }: Props) => {

	return (
		<li>
			<div className="posts-list-block">
				<div className="content">
					<Link href={`/post/${post.slug}`} as={undefined}>
						<a className="post-img">
							<Image
								src={post.featuredImage}
								layout="fill"
								alt=""
								loading="lazy"
							/>
						</a>
					</Link>
					<div className="tags">
						{post.tags.map((tag) => (
							<TagLink key={tag} tag={tag} />
						))}
					</div>
					<Link href={`/post/${post.slug}`}>
						<a className="link">{post.title}</a>
					</Link>
				</div>
			</div>
		</li>
	)
};

export default PostCard;
