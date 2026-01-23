import { Request, Response } from 'express';

class UserController {
    public createUser(req: Request, res: Response): void {
        // Logic for creating a user
        res.send('User created');
    }

    public getUser(req: Request, res: Response): void {
        // Logic for retrieving a user
        res.send('User details');
    }
}

type FactCheckResult = {
    verdict: string;
    confidence: number;
    summary: string;
    checks: Array<{ label: string; status: string }>;
};

class FactCheckController {
    public checkStatement(req: Request, res: Response): void {
        const statement = String(req.body?.statement ?? '').trim();
        const speaker = String(req.body?.speaker ?? '').trim();

        if (!statement) {
            res.status(400).json({ error: 'Please provide a statement to analyze.' });
            return;
        }

        const normalized = statement.toLowerCase();
        const hasNumbers = /\d/.test(statement);
        const hasAbsolutes = /\b(always|never|all|none|every|everyone)\b/i.test(normalized);
        const hasSources = /\b(according to|report|study|data|evidence|statistics)\b/i.test(normalized);

        const checks: FactCheckResult['checks'] = [
            {
                label: 'Clarify who said it and when',
                status: speaker ? 'Provided' : 'Missing',
            },
            {
                label: 'Verify numeric claims with primary sources',
                status: hasNumbers ? 'Needed' : 'Optional',
            },
            {
                label: 'Watch for absolute language that needs evidence',
                status: hasAbsolutes ? 'Flagged' : 'Not detected',
            },
            {
                label: 'Look for cited sources or data',
                status: hasSources ? 'Mentioned' : 'Missing',
            },
        ];

        const confidenceBase = 0.42;
        const confidenceBoost = (hasSources ? 0.08 : 0) + (speaker ? 0.05 : 0);
        const confidence = Math.min(0.7, confidenceBase + confidenceBoost);

        const result: FactCheckResult = {
            verdict: hasSources ? 'Needs verification' : 'Needs context',
            confidence,
            summary: speaker
                ? `We captured a statement attributed to ${speaker}. Start by verifying the original context and sources before drawing conclusions.`
                : 'We captured the statement. Start by confirming who said it and the original context before drawing conclusions.',
            checks,
        };

        res.json(result);
    }
}

export { UserController, FactCheckController };
