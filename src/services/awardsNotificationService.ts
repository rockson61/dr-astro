/**
 * DR Digital Awards - Notification Service
 * Sends notifications for award events
 */

import { supabase } from '../lib/supabase';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

interface NotificationData {
    userId: string;
    type: 'award_nominated' | 'award_shortlisted' | 'award_finalist' | 'award_winner' | 'award_voting_open';
    title: string;
    message: string;
    metadata?: Record<string, any>;
}

// =====================================================
// IN-APP NOTIFICATIONS
// =====================================================

/**
 * Create in-app notification
 */
export async function createNotification(data: NotificationData): Promise<void> {
    try {
        await (supabase
            .from('notifications') as any)
            .insert({
                user_id: data.userId,
                type: data.type,
                title: data.title,
                message: data.message,
                metadata: data.metadata,
                read: false,
                created_at: new Date().toISOString()
            });

        console.log(`✅ Notification created for user ${data.userId}: ${data.type}`);
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

// =====================================================
// AWARD EVENT NOTIFICATIONS
// =====================================================

/**
 * Notify user they've been nominated
 */
export async function notifyNomination(
    userId: string,
    categoryName: string,
    awardTitle: string
): Promise<void> {
    await createNotification({
        userId,
        type: 'award_nominated',
        title: '🎊 You\'ve Been Nominated!',
        message: `Congratulations! You've been nominated for ${categoryName} in the ${awardTitle}.`,
        metadata: {
            categoryName,
            awardTitle
        }
    });
}

/**
 * Notify user they made the shortlist
 */
export async function notifyShortlisted(
    userId: string,
    categoryName: string,
    awardTitle: string
): Promise<void> {
    await createNotification({
        userId,
        type: 'award_shortlisted',
        title: '⭐ You Made the Shortlist!',
        message: `Great news! You've been shortlisted for ${categoryName} in the ${awardTitle}.`,
        metadata: {
            categoryName,
            awardTitle
        }
    });
}

/**
 * Notify user they're a finalist
 */
export async function notifyFinalist(
    userId: string,
    categoryName: string,
    awardTitle: string,
    rank: number
): Promise<void> {
    await createNotification({
        userId,
        type: 'award_finalist',
        title: '🏆 You\'re a Finalist!',
        message: `Amazing! You're a finalist (#${rank}) for ${categoryName} in the ${awardTitle}. Public voting is now open!`,
        metadata: {
            categoryName,
            awardTitle,
            rank
        }
    });
}

/**
 * Notify user they won
 */
export async function notifyWinner(
    userId: string,
    categoryName: string,
    awardTitle: string,
    isRunnerUp: boolean = false
): Promise<void> {
    await createNotification({
        userId,
        type: 'award_winner',
        title: isRunnerUp ? '🥈 Runner-up!' : '🏆 Congratulations - You Won!',
        message: isRunnerUp
            ? `You're a runner-up for ${categoryName} in the ${awardTitle}!`
            : `Congratulations! You've won ${categoryName} in the ${awardTitle}!`,
        metadata: {
            categoryName,
            awardTitle,
            isRunnerUp
        }
    });
}

/**
 * Notify voting is open for a category
 */
export async function notifyVotingOpen(
    userId: string,
    categoryName: string,
    awardTitle: string
): Promise<void> {
    await createNotification({
        userId,
        type: 'award_voting_open',
        title: '🗳️ Voting is Open!',
        message: `Support your favorite nominees! Voting is now open for ${categoryName} in the ${awardTitle}.`,
        metadata: {
            categoryName,
            awardTitle
        }
    });
}

// =====================================================
// BATCH NOTIFICATIONS
// =====================================================

/**
 * Notify all participants in a category
 */
export async function notifyCategoryParticipants(
    categoryId: string,
    notificationType: 'voting_open' | 'results_announced'
): Promise<number> {
    try {
        // Fetch category and participants
        const { data: category } = await (supabase
            .from('award_categories') as any)
            .select('name, award:awards(title)')
            .eq('id', categoryId)
            .single();

        if (!category) return 0;

        const { data: participants } = await (supabase
            .from('award_participants') as any)
            .select('participant_id, status')
            .eq('category_id', categoryId);

        if (!participants) return 0;

        let count = 0;

        for (const participant of participants) {
            if (notificationType === 'voting_open') {
                await notifyVotingOpen(
                    participant.participant_id,
                    category.name,
                    category.award.title
                );
            }
            count++;
        }

        console.log(`✅ Sent ${count} notifications for category ${categoryId}`);
        return count;
    } catch (error) {
        console.error('Error notifying category participants:', error);
        return 0;
    }
}

/**
 * Notify status changes for participants
 */
export async function notifyStatusChange(
    participantRecordId: string,
    newStatus: string
): Promise<void> {
    try {
        // Fetch participant details
        const { data: participant } = await (supabase
            .from('award_participants') as any)
            .select(`
        participant_id,
        rank,
        category:award_categories(name, award:awards(title))
      `)
            .eq('id', participantRecordId)
            .single();

        if (!participant) return;

        const categoryName = participant.category.name;
        const awardTitle = participant.category.award.title;

        // Send appropriate notification based on status
        switch (newStatus) {
            case 'eligible':
                await notifyNomination(participant.participant_id, categoryName, awardTitle);
                break;
            case 'shortlisted':
                await notifyShortlisted(participant.participant_id, categoryName, awardTitle);
                break;
            case 'finalist':
                await notifyFinalist(participant.participant_id, categoryName, awardTitle, participant.rank);
                break;
            case 'winner':
                await notifyWinner(participant.participant_id, categoryName, awardTitle, false);
                break;
            case 'runner_up':
                await notifyWinner(participant.participant_id, categoryName, awardTitle, true);
                break;
        }
    } catch (error) {
        console.error('Error notifying status change:', error);
    }
}

// =====================================================
// EMAIL NOTIFICATIONS (Placeholder)
// =====================================================

/**
 * Send email notification
 * TODO: Integrate with email service (SendGrid, Resend, etc.)
 */
export async function sendEmail(
    to: string,
    subject: string,
    htmlContent: string
): Promise<void> {
    console.log(`📧 Email would be sent to ${to}`);
    console.log(`Subject: ${subject}`);

    // TODO: Implement actual email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'awards@dentalreach.com',
    //   to,
    //   subject,
    //   html: htmlContent
    // });
}

/**
 * Send winner announcement email
 */
export async function sendWinnerEmail(
    userId: string,
    categoryName: string,
    awardTitle: string
): Promise<void> {
    try {
        // Fetch user email
        const { data: profile } = await (supabase
            .from('profiles') as any)
            .select('email, full_name')
            .eq('id', userId)
            .single();

        if (!profile?.email) return;

        const subject = `🏆 Congratulations! You won ${categoryName}`;
        const html = `
      <h1>Congratulations ${profile.full_name}!</h1>
      <p>We're thrilled to announce that you've won <strong>${categoryName}</strong> in the ${awardTitle}!</p>
      <p>Your exceptional work and dedication have been recognized by the dental community.</p>
      <p><a href="https://dentalreach.com/dashboard/my-awards">View your award</a></p>
      <p>Best regards,<br>The DentalReach Team</p>
    `;

        await sendEmail(profile.email, subject, html);
    } catch (error) {
        console.error('Error sending winner email:', error);
    }
}

// =====================================================
// EXPORTS
// =====================================================

export const NotificationService = {
    createNotification,
    notifyNomination,
    notifyShortlisted,
    notifyFinalist,
    notifyWinner,
    notifyVotingOpen,
    notifyCategoryParticipants,
    notifyStatusChange,
    sendWinnerEmail
};
