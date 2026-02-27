import { Metadata } from 'next';
import RegistryClient from '@/components/RegistryClient';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Gift Registry',
};

export default function Registry() {
    return <RegistryClient />;
}
