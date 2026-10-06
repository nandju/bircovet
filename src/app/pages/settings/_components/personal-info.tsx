import {
  CallIcon,
  EmailIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function PersonalInfoForm() {
  return (
    <ShowcaseSection title="Informations Personnelles" className="!p-7">
      <form>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="fullName"
            label="Nom complet"
            placeholder="Dr. Marc Hervé"
            defaultValue="Dr. Marc Hervé"
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phoneNumber"
            label="Téléphone"
            placeholder="+225 07 01 23 45 67"
            defaultValue="+225 07 01 23 45 67"
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email"
          placeholder="marc.herve@bircovet.ci"
          defaultValue="marc.herve@bircovet.ci"
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="establishment"
          label="Établissement"
          placeholder="BIRCOVET Abidjan"
          defaultValue="BIRCOVET Abidjan"
          icon={<UserIcon />}
            iconPosition="left"
            height="sm"
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="role"
          label="Rôle"
          placeholder="DG Vétérinaire"
          defaultValue="DG Vétérinaire"
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
          disabled
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Annuler
          </button>

          <button
            className="rounded-lg bg-[#04A154] px-6 py-[7px] font-medium text-white hover:bg-[#038343]"
            type="submit"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
