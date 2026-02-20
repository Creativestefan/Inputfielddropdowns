function Caret() {
  return <div className="bg-[#fafafa] rounded-[2px] size-[10px]" data-name="Caret" />;
}

export default function Tooltip() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative rounded-[8px] size-full" data-name="Tooltip">
      <div className="-translate-x-1/2 absolute bottom-[-6.14px] flex items-center justify-center left-[calc(50%+0.07px)] size-[14.142px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-45 flex-none">
          <Caret />
        </div>
      </div>
      <p className="font-['Open_Runde:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#18181b] text-[12px] tracking-[0.12px]">Select a workspace</p>
    </div>
  );
}