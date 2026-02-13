
-- Tighten the notifications INSERT policy to only allow inserting for oneself
DROP POLICY "System can create notifications" ON public.notifications;
CREATE POLICY "Users can create own notifications" ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (recipient_id = auth.uid());
