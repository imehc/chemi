import flvjs from "flv.js";
import { useEffect, useState, useCallback, useMemo } from "react";

interface Props {
  /**
   * 播放容器
   */
  video: HTMLVideoElement | null;
  /**
   * 播放地址
   * flv
   */
  url?: string
}

interface Result {
  /**
   * 是否加载
   */
  isLoading: boolean;
  /**
   * 是否播放
   */
  isPlaying: boolean;
  /**
   * 是否暂停
   */
  isPaused: boolean;
  /**
   * 是否异常
   */
  isError: boolean;
  /**
   * 播放回调
   */
  onPlay(): void;
  /**
   * 暂停回调
   */
  onPause(): void;
  /**
   * 全屏回调
   */
  onFull(): void
}

export const useVideoPlayer = ({
  video,
  url,
}: Props) => {
  const [player, setPlayer] = useState<flvjs.Player>()

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handlePlaying = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsError(false);
    setIsLoading(false);
  }, [])
  const handlePaused = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
    setIsLoading(false);
  }, [])
  const handleError = useCallback(() => {
    setIsPlaying(false);
    setIsError(true);
    setIsLoading(false);
  }, [])

  const play = useCallback(() => {
    try {
      player?.play()
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [player])

  const pause = useCallback(() => {
    try {
      player?.pause()

    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [player])

  const full = useCallback(() => {
    if (!video) {
      return;
    }
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        video.requestFullscreen().catch(error => {
          console.error(`请求全屏失败: ${error.message}`);
        });
      }
      return
    }
    console.error('当前浏览器不支持全屏')
  }, [video])

  useEffect(() => {
    if (!video || !url) {
      return
    }
    if (!flvjs.isSupported()) {
      return
    }
    const player = flvjs.createPlayer({
      type: 'flv',
      url,
      hasAudio: false,
      hasVideo: true,
      isLive: true
    });
    player.attachMediaElement(video);
    player.load();
    player.play();
    setPlayer(player);

    player.on(flvjs.Events.LOADING_COMPLETE, () => {
      console.log("加载完成")
    })
    player.on(flvjs.Events.MEDIA_INFO, () => {
      console.log("媒体信息")
    })
    player.on(flvjs.Events.METADATA_ARRIVED, () => {
      console.log("获取元数据")
    })
    player.on(flvjs.Events.RECOVERED_EARLY_EOF, () => {
      console.log("恢复早期EOF")
    })
    player.on(flvjs.Events.SCRIPTDATA_ARRIVED, () => {
      console.log("获取到脚本数据")
    })
    player.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
      console.log("视频错误信息回调")
      console.log("errorType:", errorType);
      console.log("errorDetail:", errorDetail);
      console.log("errorInfo:", errorInfo);
      handleError()
    })
    // 该事件会一直监听flvjs实例
    player.on(flvjs.Events.STATISTICS_INFO, () => {
      console.log("请求数据信息");
    })

    return () => {
      if (player) {
        player.unload();
        player.detachMediaElement();
        player.destroy();
      }
    };
  }, [handleError, url, video])

  useEffect(() => {
    if (!video) {
      return
    }
    const loadedmetadata = () => {
      handlePaused();
      console.log("加载数据");
    }
    const play = () => {
      // handlePlaying();
      console.log("开始播放");
    }
    const playing = () => {
      handlePlaying();
      console.log("播放准备开始");
    }
    const waiting = () => {
      setIsLoading(true);
      console.log("加载中");
    }
    const pause = () => {
      handlePaused();
      console.log("暂停播放");
    }
    const ended = () => {
      console.log("播放结束");
    }
    video.addEventListener('loadedmetadata', loadedmetadata);
    video.addEventListener('play', play);
    video.addEventListener('playing', playing);
    video.addEventListener('waiting', waiting);
    video.addEventListener('pause', pause);
    video.addEventListener('ended', ended);

    return () => {
      video.removeEventListener('loadedmetadata', loadedmetadata);
      video.removeEventListener('play', play);
      video.removeEventListener('waiting', waiting);
      video.removeEventListener('pause', pause);
      video.removeEventListener('ended', ended);
      if (document.fullscreenEnabled) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    }
  }, [handlePaused, handlePlaying, video])

  useEffect(() => {
    if (!video || !url || !isPlaying) {
      return
    }
    const timer = setTimeout(() => {
      pause();
    }, 2 * 60 * 1000);

    return () => {
      clearTimeout(timer)
    }
  }, [isPlaying, pause, url, video])

  return useMemo<Result>(() => ({
    isLoading,
    isError,
    isPaused,
    isPlaying,
    onPause: pause,
    onPlay: play,
    onFull: full,
  }), [full, isError, isLoading, isPaused, isPlaying, pause, play])
} 