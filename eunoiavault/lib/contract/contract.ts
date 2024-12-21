import { ethers } from 'ethers';
import MeditationStakingContractABI from '../../config/MeditationStakingContract.json';

const meditationStakingContractAddress = process.env.MEDITATION_STAKING_CONTRACT_ADDRESS! || "0xC8A180db58be651D787e05f69E3c6D24995e587D";

export const getMeditationStakingContract = (provider: ethers.providers.Provider) => {
  return new ethers.Contract(meditationStakingContractAddress, MeditationStakingContractABI, provider);
};
