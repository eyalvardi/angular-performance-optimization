export var threshold = `
    let threshold = source
      .pipe(
          auditTime(500),
          scan((acc,curr)=>{
                return {
                    curr,
                    delta: Math.abs(acc.curr - curr)
                }
           }),
          filter(value => value.delta > 15)
          map(acc => acc.curr)
          distinctUntilChanged()
      );
    `;

export var upDown = `
    threshold
      .pipe(
        scan((acc,curr)=>{
             return {
                        curr,
                        isUp: curr - acc.curr > 0
             }
        }),
        map(val => val.isUp),
        distinctUntilChanged()
      );
    `;
