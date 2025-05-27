const CarouselSlideItem: React.FC<CarouselSlideItemProps> = React.memo(({ item, itemsToShow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startHoverTimer = () => {
    holdTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 1500); // 1.5 seconds hold to activate hover
  };

  const cancelHoverTimer = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setIsHovered(false);
  };

  return (
    <div
      className="relative h-full flex-shrink-0"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onMouseEnter={startHoverTimer}
      onMouseLeave={cancelHoverTimer}
      onTouchStart={startHoverTimer}
      onTouchEnd={cancelHoverTimer}
      onTouchCancel={cancelHoverTimer}
      role="group"
      aria-roledescription="slide"
    >
      <div
        className={`w-full h-full p-0.5 sm:p-1 transition-transform duration-300 ease-in-out ${
          isHovered ? 'scale-105 z-20' : 'z-10'
        } rounded-md`}
        style={{ transformOrigin: 'center center' }}
      >
        <MediaRenderer mediaItem={item} className="w-full h-full object-cover rounded-md" />
      </div>
      {isHovered && item.description && (
        <div
          className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 bg-[#22223b]/90 text-[#f2e9e4] text-xs rounded-b-md mx-0.5 sm:mx-1 font-['Roboto Mono']"
          style={{ transformOrigin: 'bottom', bottom: '0.125rem' }}
        >
          {item.description}
        </div>
      )}
    </div>
  );
});
