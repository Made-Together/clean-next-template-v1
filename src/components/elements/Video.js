import React from "react";
import dynamic from "next/dynamic";
import Image from "~/components/elements/Image";

const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });

export default function Video(props) {
	return props.display_type === "modal" ? <VideoModal {...props} /> : <VideoTypeRenderer {...props} />;
}

function VideoModal({ video_type, youtube_video_id, file, embed, video_modal = {}, children }) {
	const [isOpen, setIsOpen] = React.useState(false);

	const {
		placeholder_image,
		placeholder_image_aspect_ratio = false,
		placeholder_image_wrapper_classname = "",
		play_button_heading,
		play_button_duration,
	} = video_modal;

	return (
		<>
			<div className="modal-video-container" onClick={() => setIsOpen(true)} onKeyPress={(e) => e} role="button" tabIndex="-1">
				<div className="group relative cursor-pointer">
					<div className={`w-full overflow-hidden rounded-[.75em] ${placeholder_image_wrapper_classname}`}>
						{placeholder_image ? (
							<div className={`${placeholder_image_aspect_ratio && "aspect-w-16 aspect-h-9"}`}>
								<Image
									image={placeholder_image}
									objectFit="cover"
									className={`${placeholder_image_aspect_ratio && "h-full"}`}
									imgClassName={`${placeholder_image_aspect_ratio && "h-full"}`}
								/>
							</div>
						) : (
							<div className="aspect-w-16 aspect-h-9 bg-purple" />
						)}
					</div>

					<div className="absolute inset-0 flex select-none flex-col items-center justify-center">
						<button type="button">
							<PlayButton heading={play_button_heading} duration={play_button_duration} />
						</button>
					</div>
				</div>
				{children && children}
			</div>

			<ModalVideo
				channel={video_type === "youtube-video-id" ? "youtube" : "custom"}
				autoplay={1}
				isOpen={isOpen}
				videoId={video_type === "youtube-video-id" ? youtube_video_id : ""}
				url={video_type === "file" ? file?.mediaItemUrl : ""}
				onClose={() => setIsOpen(false)}
			>
				{video_type === "embed" && <div dangerouslySetInnerHTML={{ __html: embed }} />}
			</ModalVideo>
		</>
	);
}

function PlayButton({ heading, duration }) {
	const hasText = heading || duration;
	let className =
		"flex items-center justify-center text-left transition-transform duration-300 ease-in-out shadow-lg cursor-pointer bg-orange group-hover:-translate-y-1";
	className += hasText ? " rounded-lg px-5 py-4" : " rounded-full w-16 h-16";

	return React.useMemo(
		() => (
			<div className={className}>
				<svg viewBox="0 0 36 36" width={hasText ? 36 : 46} height={hasText ? 36 : 46} fill="none" xmlns="http://www.w3.org/2000/svg">
					{hasText && <circle cx="18" cy="18" r="17.5" stroke="#fff" strokeOpacity=".3" />}
					<path d="M22.985 17.21a1 1 0 0 1 0 1.58l-6.371 4.955a1 1 0 0 1-1.614-.79v-9.91a1 1 0 0 1 1.614-.79l6.371 4.956z" fill="#fff" />
				</svg>

				{hasText && (
					<div className="ml-5 mr-1.5 flex-auto leading-tight text-white">
						{heading && <div className="text-14px font-semibold">{heading}</div>}
						{duration && <div className="text-12px opacity-[60%]">{duration}</div>}
					</div>
				)}
			</div>
		),
		[hasText, heading, duration, className]
	);
}

function VideoTypeRenderer({ video_type, embed, file, youtube_video_id }) {
	return (
		<>
			{video_type === "embed" && embed?.length > 0 && <div className="w-full" dangerouslySetInnerHTML={{ __html: embed }} />}
			{video_type === "file" && file?.media_item_url && file?.media_item_url.length > 0 && <video src={file?.media_item_url} autoPlay playsInline muted />}
			{video_type === "youtube-video-id" && youtube_video_id?.length > 0 && (
				<div className="aspect-w-16 aspect-h-9">
					<div>
						<iframe
							width="100%"
							height="100%"
							src={`https://www.youtube.com/embed/${youtube_video_id}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</div>
			)}
		</>
	);
}
