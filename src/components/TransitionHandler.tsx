import { useRef, useEffect, ReactNode, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionHandlerProps {
  children: ReactNode;
  url: string;
}

/**
 * TransitionHandler는 페이지 전환 시 애니메이션을 관리하는 컴포넌트입니다.
 * Next.js의 내장 Link 컴포넌트를 사용할 경우, 페이지 전환 전 exit 애니메이션이
 * 제대로 표시되지 않기 때문에 이 컴포넌트를 사용하여 애니메이션 순서를 제어합니다.
 *
 * @example
 * <TransitionHandler url={url}>
 *   {children}
 * </TransitionHandler>
 *
 * @param {ReactNode} children
 * @param {string} url - 이동할 페이지의 URL.
 */

const TransitionHandler = ({ children, url }: TransitionHandlerProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);
  const router = useRouter();

  /**
   * router.push 후 페이지 진입 애니메이션.
   */
  const onPageEnter = () => {
    if (elementRef.current) {
      const element = elementRef.current;
      router.push(url);
      gsap.set(element, { autoAlpha: 0, y: 100 });
      gsap
        .timeline({
          paused: true,
        })
        .to(element, { autoAlpha: 1, y: 0, ease: "power3.inOut" })
        .play();
    }
  };

  /**
   * 다음 페이지 프리패칭 후 unmount 애니메이션.
   */
  const onPageExit = () => {
    if (elementRef.current) {
      const element = elementRef.current;
      router.prefetch(url);
      gsap.set(element, { autoAlpha: 1, yPercent: 0 });
      gsap
        .timeline({
          paused: true,
          onComplete: () => onPageEnter(),
        })
        .to(element, { y: 100, autoAlpha: 0, ease: "power3.inOut" })
        .play();
    }
  };

  useEffect(() => {
    console.log(url, firstLoad.current);
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    onPageExit();
  }, [url]);

  return <main ref={elementRef}>{children}</main>;
};

export default memo(TransitionHandler);