import svgPaths from "./svg-d6uhnhnma1";

export default function Button() {
  return (
    <div className="relative rounded-[10px] size-full" data-name="Button" style={{ backgroundImage: "url(\'data:image/svg+xml;utf8,<svg viewBox=\\'0 0 134 40\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.30000001192092896\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(1.6423e-14 4 -10.23 1.6669e-14 67 -1.0658e-13)\\'><stop stop-color=\\'rgba(255,255,255,0.3)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>\'), linear-gradient(90deg, rgb(4, 138, 245) 0%, rgb(4, 138, 245) 100%)" }}>
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[24px] py-[8px] relative rounded-[inherit] size-full">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Huge Icons / ai-editingai-editing">
          <div className="absolute inset-[8.33%_12.5%]" data-name="elements">
            <div className="absolute inset-[-5.62%_-5.54%_-4.99%_-6.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.415 14.7485">
                <g>
                  <path d={svgPaths.pd642280} id="Star 1" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
                  <path d={svgPaths.p13412b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['Open_Runde:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white">New chat</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),0px_0px_0px_1px_#048af5]" />
    </div>
  );
}