<div className={`${s.Advice_time} ${item.slot === advise.slot ? s.active : ""}`}>Hello</div>

.Advice_time {
        @apply flex flex-col items-center justify-center py-6 rounded-3xl w-full;
        border: 1.5px solid #efb5b5;
        & .Advice_time.active{
          border: 1.5px solid #41425c;
}
