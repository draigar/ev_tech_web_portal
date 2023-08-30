
export const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      const script: any = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
  