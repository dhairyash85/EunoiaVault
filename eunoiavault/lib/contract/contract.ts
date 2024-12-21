import { ethers } from 'ethers';
import MeditationStakingContractABI from '../../config/MeditationStakingContract.json';

const meditationStakingContractAddress = process.env.MEDITATION_STAKING_CONTRACT_ADDRESS! || "0x228042d915661C3aAd125E77d7B6cC21dFfd2f56";

export const getMeditationStakingContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(meditationStakingContractAddress, MeditationStakingContractABI, provider);
};
