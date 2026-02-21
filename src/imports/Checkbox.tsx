import svgPaths from "./svg-j1vv09pz5d";

export default function Checkbox() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[8px] items-start relative size-full" data-name="Checkbox">
      <div className="relative rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 size-[16px]" data-name="Checkbox">
        <div className="absolute bg-[#048af5] left-0 rounded-[4px] size-[16px] top-0" data-name="base" />
        <div className="absolute left-px overflow-clip size-[14px] top-px" data-name="Lucide Icons / check">
          <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Vector">
            <div className="absolute inset-[-10.36%_-7.12%_-10.36%_-7.13%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6633 7.74667">
                <path d={svgPaths.p3f47e280} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Open_Runde:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-left">Show Quote</p>
    </button>
  );
}