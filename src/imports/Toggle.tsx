import svgPaths from "./svg-rquh31j9e8";

export default function Toggle() {
  return (
    <button className="bg-[#0a1a2a] content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-clip px-[6px] py-[4px] relative rounded-[8px] size-full" data-name="Toggle">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[8.33%_12.5%]" data-name="elements">
          <div className="absolute inset-[-4.99%_-5.54%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3301 14.6636">
              <g>
                <g id="Vector">
                  <path d={svgPaths.p3ae556c0} stroke="var(--stroke-0, #359BFF)" strokeWidth="1.33" />
                  <path d={svgPaths.p2f4ade80} stroke="var(--stroke-0, #359BFF)" strokeWidth="1.33" />
                  <path d={svgPaths.p2ecf0900} stroke="var(--stroke-0, #359BFF)" strokeWidth="1.33" />
                </g>
                <path d={svgPaths.p2acca280} id="Vector_2" stroke="var(--stroke-0, #359BFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Open_Runde:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#359bff] text-[14px] text-left">Research</p>
    </button>
  );
}