export default class IcsModifier {
    // Private properties to store the content and reminder settings
    private icsContent: string;
    private reminderDays: number;
    private reminderHours: number;
    private reminderPrefix = 'Erinnerung: ';

    // Constructor to initialize the class with the content and reminder settings
    constructor(icsContent: string, reminderDays: number, reminderHours: number) {
        this.icsContent = icsContent;
        this.reminderDays = reminderDays;
        this.reminderHours = reminderHours;
    }

    // Method to modify events in the ICS content
    modifyEvents(): string {
        // Regular expression to match individual events
        const eventRegex = /BEGIN:VEVENT.*?END:VEVENT/gs;

        // Replace each event in the ICS content
        return this.icsContent.replace(eventRegex, (event) => {
            // Extract the summary string from the event
            const summaryRegex = /SUMMARY:(.*)\r\n/;
            const summaryMatch = event.match(summaryRegex);
            const summary = summaryMatch ? summaryMatch[1] : '';
            const triggerValue = this.createTriggerValue();

            // Create an additional string for the VAlarm
            const additionalString = this.createVAlarmString(this.reminderPrefix + summary, triggerValue);

            // Insert the additional string before "END:VEVENT"
            return event.replace(/END:VEVENT/, additionalString + 'END:VEVENT');
        });
    }

    // Helper method to create a VAlarm string
    private createVAlarmString(summary: string, trigger: string): string {
        // Construct the VAlarm string
        let vAlarmString = 'BEGIN:VALARM\r\n';
        vAlarmString += 'ACTION:DISPLAY\r\n';
        vAlarmString += `DESCRIPTION:${summary}\r\n`;
        vAlarmString += `TRIGGER:${trigger}\r\n`;
        vAlarmString += 'END:VALARM\r\n';

        return vAlarmString;
    }

    // Helper method to create a trigger value string
    private createTriggerValue() {
        // Calculate hours until midnight of the event day
        const hoursUntilMidnight = this.reminderHours === 0 ? 0 : 24 - this.reminderHours;

        // Use reminderDays directly as daysPart
        let daysPart = this.reminderDays;
        // daysPart is 1 set to 0
        if (daysPart === 1) {
            daysPart = 0;
        }

        // Create the trigger string
        const trigger = `-P${daysPart}DT${hoursUntilMidnight}H0M0S`;
        return trigger;
    }
}
