interface Props {
  youtubeLink: string;
}

const VideoPlayer = ({ youtubeLink }: Props) => {
  const getYouTubeId = (url: string) => {
    const regex = /[?&]v=([^&#]*)|youtu\.be\/([^?&]*)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : "";
  };

  const videoId = getYouTubeId(youtubeLink);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="flex flex-col items-center w-full md:p-4">
      <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
        {videoId ? (
          <iframe
            width="100%"
            height="500px"
            src={embedUrl}
            title="Goody Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <p className="text-white text-center p-4">
            Enter a valid YouTube URL
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
