import fs from 'fs';
import { SourceDemoParser } from '@nekz/sdp';
import { readSarMessages, isSarMessage, SarDataType } from '@nekz/sdp/utils';
export function parseMtriggers(demoPath) {
    const demo = SourceDemoParser.default()
        .setOptions({ userCmds: true })
        .parse(fs.readFileSync(demoPath));

    const messages = readSarMessages(demo);
    const sr = messages.find(isSarMessage(SarDataType.SpeedrunTime));
    let mtriggers = [];
    let totalLength = 0;

    for (let i = 0; i < sr.splits.length; i++) {
        let split = sr.splits[i].segs[0].ticks;
        mtriggers.push(split + totalLength);
        totalLength += split;
    }
    return mtriggers;
}
