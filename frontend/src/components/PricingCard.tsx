import { useState } from 'react';
import PayModal from './PayModal';
import { Button, Icon, Badge, Card } from './ui';

/**
 * PricingCard component displays early-bird supporter pricing information
 * and features with a payment button to open the payment modal
 */
export default function PricingCard() {
  const [showPayModal, setShowPayModal] = useState(false);

  // Features list data
  const features = [
    'Lifetime discount on all future plans',
    'Private alpha access',
    'Early-Bird Discord role'
  ];

  // Card header with pricing information
  const cardHeader = (
    <div className="text-center py-2">
      <h3 className="text-2xl font-semibold mb-2">Early-Bird Supporter</h3>
      <div className="text-3xl font-bold text-accent mb-4">10 USDC</div>
      <p className="text-text/70 text-sm">(≈ $10)</p>
    </div>
  );

  // Card footer with payment button
  const cardFooter = (
    <Button
      variant="secondary"
      fullWidth
      onClick={() => setShowPayModal(true)}
      aria-label="Pay 10 USDC using Solana"
    >
      Early-Bird 10 USDC (Solana)
      <Badge className="ml-2">Limited</Badge>
    </Button>
  );

  return (
    <>
      <Card 
        variant="glass" 
        className="w-full h-full" 
        header={cardHeader}
        footer={cardFooter}
        interactive
      >
        {/* Feature list section */}
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Icon 
                name="checkmark" 
                className="text-accent mr-3 mt-0.5 flex-shrink-0" 
                size={20} 
                filled
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Payment modal */}
      {showPayModal && (
        <PayModal onClose={() => setShowPayModal(false)} />
      )}
    </>
  );
}
